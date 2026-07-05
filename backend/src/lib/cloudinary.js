const cloudinary = require("cloudinary").v2;
const { CLOUDINARY } = require("../config");

cloudinary.config({
  cloud_name: CLOUDINARY.cloudName,
  api_key: CLOUDINARY.apiKey,
  api_secret: CLOUDINARY.apiSecret,
});

module.exports = cloudinary;
