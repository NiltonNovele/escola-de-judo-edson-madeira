const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../lib/cloudinary");

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ejem/proofs",
    resource_type: "auto",
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: function (_req, file, cb) {
    if (allowedMimeTypes.has(file.mimetype)) return cb(null, true);
    cb(new Error("Unsupported file type. Use JPG, PNG, WEBP, or PDF."));
  },
});

module.exports = upload;
