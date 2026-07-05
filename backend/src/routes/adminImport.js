const path = require("path");
const express = require("express");
const { COLLECTIONS } = require("../config");
const adminAuth = require("../middleware/adminAuth");
const cloudinary = require("../lib/cloudinary");
const { writeJsonArray } = require("../storage/jsonStore");

const router = express.Router();

// Temporary migration helper: takes the JSON produced by the old backend's
// file-based GET /admin/export and writes it into MongoDB, re-uploading
// each file to Cloudinary. Remove this route once the migration is done.
router.post("/admin/import", adminAuth, async (req, res) => {
  try {
    const { data, uploads } = req.body || {};

    if (!data || typeof data !== "object") {
      return res.status(400).json({
        status: "error",
        message: "Missing 'data' object in request body.",
      });
    }

    const urlMap = {};

    for (const file of Array.isArray(uploads) ? uploads : []) {
      const folder = `ejem/${path.dirname(file.path)}`;
      const uploadResult = await cloudinary.uploader.upload(
        `data:${file.mimeType};base64,${file.contentBase64}`,
        { folder, resource_type: "auto" }
      );

      urlMap[`/uploads/${file.path}`] = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    }

    for (const [key, collectionName] of Object.entries(COLLECTIONS)) {
      const records = Array.isArray(data[key]) ? data[key] : [];

      const migrated = records.map((record) => {
        const updated = { ...record };

        if (updated.image && urlMap[updated.image]) {
          updated.imagePublicId = urlMap[updated.image].publicId;
          updated.image = urlMap[updated.image].url;
        }

        if (updated.proofUrl && urlMap[updated.proofUrl]) {
          updated.proofUrl = urlMap[updated.proofUrl].url;
        }

        return updated;
      });

      await writeJsonArray(collectionName, migrated);
    }

    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Admin import error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while importing data.",
    });
  }
});

module.exports = router;
