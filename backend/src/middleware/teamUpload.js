const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../lib/cloudinary");

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ejem/team",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const teamUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: function (_req, file, cb) {
    if (allowedMimeTypes.has(file.mimetype)) return cb(null, true);
    cb(new Error("Unsupported file type. Use JPG, PNG, or WEBP."));
  },
});

module.exports = teamUpload;
