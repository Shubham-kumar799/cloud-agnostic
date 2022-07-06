const mongoose = require('mongoose');

const awsBucketSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AwsBucket', awsBucketSchema);
