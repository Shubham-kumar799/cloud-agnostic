const User = require('../models/user');
const AwsBucket = require('../models/awsBucket');

const isOwner = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    const bucket = await AwsBucket.findById(req.params.bucketId);

    if (user._id.toString() == bucket.owner.toString()) {
      next();
    } else {
      res.status(400).json({
        success: false,
        msg: 'Unauthorized',
      });
    }
  } catch (error) {
    console.log('Error in isOwner middleware => ', error);
    res.status(403).json({
      success: false,
      error: 'Unauthenticated',
    });
  }
};

module.exports = { isOwner };
