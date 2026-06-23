const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const { PROOFS_DIR } = require("../config");

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

const upload = multer({
  storage: multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, PROOFS_DIR);
    },
    filename: function (_req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase();
      const safeBase = path
        .basename(file.originalname, ext)
        .replace(/[^a-zA-Z0-9-_]/g, "_")
        .slice(0, 80);

      cb(null, `${Date.now()}-${crypto.randomUUID()}-${safeBase}${ext}`);
    },
  }),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: function (_req, file, cb) {
    if (allowedMimeTypes.has(file.mimetype)) return cb(null, true);
    cb(new Error("Unsupported file type. Use JPG, PNG, WEBP, or PDF."));
  },
});

module.exports = upload;
