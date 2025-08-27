const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, //By default cloud_name variable is to be named cloud_name and nothing else similarly for the other two.
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "WANDERLUST_DEV",
    allowerdFormats: ["png","jpg","jpeg"],
  },
});

module.exports = {
    cloudinary,
    storage,
}