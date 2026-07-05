const crypto = require("crypto");
const express = require("express");
const { COLLECTIONS } = require("../config");
const { readJsonArray, writeJsonArray } = require("../storage/jsonStore");
const { buildReference } = require("../utils");

const router = express.Router();

router.post("/partnerships", async (req, res) => {
  try {
    const data = req.body;
    const partnerships = await readJsonArray(COLLECTIONS.partnerships);
    const reference = buildReference("PAR");
    const now = new Date().toISOString();

    partnerships.push({
      id: crypto.randomUUID(),
      reference,
      ...data,
      createdAt: now,
      updatedAt: now,
    });

    await writeJsonArray(COLLECTIONS.partnerships, partnerships);

    return res.status(201).json({
      status: "success",
      message: "Partnership submitted successfully.",
      data: { reference },
    });
  } catch (error) {
    console.error("Partnership error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while saving partnership.",
    });
  }
});

module.exports = router;
