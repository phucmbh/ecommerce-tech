const multer = require('multer');
const MAX_10_MB = 10000000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') cb(null, true);
  else cb(new multer.MulterError('File is not of the correct type'), false);
};

var upload = multer({
  storage,
  limits: { fileSize: MAX_10_MB },
  fileFilter,
});

//Upload Multiple Files
// upload = upload.fields([
//   { name: 'avatar', maxCount: 1 },
//   { name: 'background', maxCount: 1 },
// ]);

module.exports = upload;
