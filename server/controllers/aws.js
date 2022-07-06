const AwsBucket = require('../models/awsBucket');
const User = require('../models/user');
const {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const fetch = require('node-fetch');
const uuid = require('uuid').v4;

const createBucket = async (req, res) => {
  try {
    const owner = await User.findOne({ email: req.user.email });
    const bucket = await new AwsBucket({
      ...req.body,
      owner: owner._id,
    }).save();
    res.status(201).json({
      success: true,
      payload: {
        _id: bucket._id,
        createdAt: bucket.createdAt,
      },
    });
  } catch (error) {
    console.log('error in createBucket AWS', error);
    res.status(400).json({
      success: false,
      msg: 'Error creating bucket',
    });
  }
};

const getBuckets = async (req, res) => {
  try {
    const owner = await User.findOne({ email: req.user.email });
    const buckets = await AwsBucket.find({ owner: owner._id }).select(
      'Aws_Target_Bucket_Name _id Aws_Region createdAt'
    );
    res.status(200).json({
      success: true,
      payload: buckets,
    });
  } catch (error) {
    console.log('error in createBucket AWS', error);
    res.status(400).json({
      success: false,
      msg: 'Error getting bucket',
    });
  }
};

const deleteBucket = async (req, res) => {
  try {
    await AwsBucket.findByIdAndDelete(req.params.bucketId);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log('error in deleting aws bucket', error);
    res.status(400).json({
      success: false,
      msg: 'Error deleting bucket',
    });
  }
};

const getBucketInfoAndContent = async (req, res) => {
  try {
    const bucket = await AwsBucket.findById(req.params.bucketId);
    const s3Client = new S3Client({
      region: bucket.Aws_Region,
      credentials: {
        accessKeyId: bucket.Aws_Access_Key_Id,
        secretAccessKey: bucket.Aws_Secret_Access_Key,
      },
    });
    const bucketParams = { Bucket: bucket.Aws_Target_Bucket_Name };
    const bucketObjects = await s3Client.send(
      new ListObjectsCommand(bucketParams)
    );

    res.status(200).json({
      success: true,
      payload: {
        bucket: {
          createdAt: bucket.createdAt,
          Aws_Region: bucket.Aws_Region,
          _id: bucket._id,
          Aws_Target_Bucket_Name: bucket.Aws_Target_Bucket_Name,
        },
        bucketObjects: bucketObjects.Contents,
      },
    });
  } catch (error) {
    console.log('error in getting bucket into and contents', error);
    res.status(400).json({
      success: false,
      msg: 'Error getting bucket info',
    });
  }
};

const upload = async (req, res) => {
  try {
    const bucket = await AwsBucket.findById(req.params.bucketId);
    const s3Client = new S3Client({
      region: bucket.Aws_Region,
      credentials: {
        accessKeyId: bucket.Aws_Access_Key_Id,
        secretAccessKey: bucket.Aws_Secret_Access_Key,
      },
    });
    let { files } = req.files;
    //convert files to an array is not an array
    if (!Array.isArray(files)) {
      files = [files];
    }

    await Promise.all(
      files.map(async file => {
        const buffer = new Buffer.from(file.filepath, 'base64');
        const bucketParams = {
          Bucket: bucket.Aws_Target_Bucket_Name,
          Key: `${uuid()}-${file.originalFilename}`,
          Body: buffer,
        };
        await s3Client.send(new PutObjectCommand(bucketParams));
      })
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log('error in upload to aws bucket', error);
    res.status(400).json({
      success: false,
      msg: 'Error uploading files',
    });
  }
};

const downloadToOwner = async (req, res) => {
  try {
    const { bucketId } = req.params;
    const { key, duration } = req.body;
    const bucket = await AwsBucket.findById(bucketId);
    const s3Client = new S3Client({
      region: bucket.Aws_Region,
      credentials: {
        accessKeyId: bucket.Aws_Access_Key_Id,
        secretAccessKey: bucket.Aws_Secret_Access_Key,
      },
    });
    var bucketParams = {
      Bucket: bucket.Aws_Target_Bucket_Name,
      Key: key,
    };
    const command = new GetObjectCommand(bucketParams);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: duration,
    });
  } catch (error) {
    console.log('error in downloadToOnwer in aws bucket', error);
    res.status(400).json({
      success: false,
      msg: 'Some Error Occured',
    });
  }
};

const getDownloadUrl = async (req, res) => {
  try {
    const { bucketId } = req.params;
    const { key, duration } = req.body;
    const bucket = await AwsBucket.findById(bucketId);
    const s3Client = new S3Client({
      region: bucket.Aws_Region,
      credentials: {
        accessKeyId: bucket.Aws_Access_Key_Id,
        secretAccessKey: bucket.Aws_Secret_Access_Key,
      },
    });
    var bucketParams = {
      Bucket: bucket.Aws_Target_Bucket_Name,
      Key: key,
    };
    const command = new GetObjectCommand(bucketParams);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: duration * 60 * 60, //in minutes
    });
    res.status(200).json({
      success: true,
      payload: signedUrl,
    });
  } catch (error) {
    console.log('error in downloadToOnwer in aws bucket', error);
    res.status(400).json({
      success: false,
      msg: 'Some Error Occured',
    });
  }
};

module.exports = {
  createBucket,
  getBuckets,
  deleteBucket,
  getBucketInfoAndContent,
  upload,
  downloadToOwner,
  getDownloadUrl,
};
