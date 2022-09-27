const multer = require('multer');
const path = require('path');


// allows multer to upload files from multipart/form-data forms
// accepting only .jpg and .png type files, capitalization counts and will throw errors
// consider adding a filesize limit to prevent abuse of data
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.JPG') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});
