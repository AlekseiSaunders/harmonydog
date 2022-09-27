const cloudinary = require('cloudinary').v2;

require('dotenv').config({ path: './config/config.env' });

// simple config data for cloudinary image storage
// should consider limiting file size or processing on upload to save bandwidth
// should also include image screening to prevent NSFW images being uploaded
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
