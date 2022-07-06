const admin = require('../firebase');

const authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.auth_token);
    req.user = firebaseUser;

    next();
  } catch (error) {
    console.log('Error in authCheck middleware => ', error);
    res.status(403).json({
      success: false,
      error: 'Unauthenticated',
    });
  }
};

module.exports = { authCheck };
