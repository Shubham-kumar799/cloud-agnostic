const formidable = require('formidable');

const formMiddleWare = (req, res, next) => {
  try {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      req.fields = fields;
      req.files = files;
      next();
    });
  } catch (error) {
    console.log('error in form middlware', error);
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = { formMiddleWare };
