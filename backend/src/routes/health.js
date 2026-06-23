const express = require("express");
const { PORT } = require("../config");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Backend running",
    port: PORT,
  });
});

module.exports = router;