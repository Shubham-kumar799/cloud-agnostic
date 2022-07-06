const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    await new User({ email: req.body.email }).save();
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log('error creating user => ', error);
    res.status(400).json({ success: false });
  }
};

module.exports = {
  createUser,
};
