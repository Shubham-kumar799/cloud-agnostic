const express = require('express');

//controllers
const {
  createBucket,
  getBuckets,
  deleteBucket,
  getBucketInfoAndContent,
  upload,
  downloadToOwner,
  getDownloadUrl,
} = require('../controllers/aws');

//middlewares
const { authCheck } = require('../middlewares/auth');
const { isOwner } = require('../middlewares/aws');
const { formMiddleWare } = require('../middlewares/fileupload');

const router = express.Router();

router.post('/create-bucket', authCheck, createBucket);
router.get('/get-buckets', authCheck, getBuckets);
router.post('/:bucketId/download', authCheck, isOwner, downloadToOwner);
router.post('/:bucketId/getDownloadUrl', authCheck, isOwner, getDownloadUrl);
router.post('/:bucketId/upload', authCheck, isOwner, formMiddleWare, upload);
router.delete('/delete-bucket/:bucketId', authCheck, isOwner, deleteBucket);
router.get(
  '/bucket-info-and-contents/:bucketId',
  authCheck,
  isOwner,
  getBucketInfoAndContent
);

module.exports = router;
