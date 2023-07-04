const cloudinary = require('cloudinary').v2;

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

var self = (module.exports = {
  uploadSingle: (file) => {
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload(file.path, {
          folder: 'single',
          use_filename: true,
        })
        .then((result) => {
          console.log(result);
          if (result) {
            const fs = require('fs');
            fs.unlinkSync(file.path);
            resolve({
              url: result.secure_url,
              id: result.public_id,
              thumb1: self.reSizeImage(result.public_id, 200, 200),
              main: self.reSizeImage(result.public_id, 500, 500),
              thumb2: self.reSizeImage(result.public_id, 300, 300),
            });
          }
        });
    });
  },

  uploadMultiple: (files) => {
    return Promise.all(files.map((file) => self.uploadSingle(file)));
  },

  reSizeImage: (id, h, w) => {
    return cloudinary.url(id, {
      height: h,
      width: w,
      crop: 'scale',
      format: 'jpg',
    });
  },
});
