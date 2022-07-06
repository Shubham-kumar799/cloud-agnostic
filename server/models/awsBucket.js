const mongoose = require('mongoose');
const { ObjectId } = mongoose;

const AwsBucketSchema = new mongoose.Schema(
  {
    Aws_Region: {
      type: String,
      required: true,
    },
    Aws_Target_Bucket_Name: {
      type: String,
      required: true,
    },
    Aws_Access_Key_Id: {
      type: String,
      required: true,
    },
    Aws_Secret_Access_Key: {
      type: String,
      required: true,
    },
    owner: {
      ref: 'User',
      type: ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AwsBucket', AwsBucketSchema);
