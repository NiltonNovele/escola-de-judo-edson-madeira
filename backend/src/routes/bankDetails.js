const express = require("express");
const { BANK_DETAILS } = require("../config");

const router = express.Router();

router.get("/bank-details", (_req, res) => {
  res.json({
    status: "success",
    data: BANK_DETAILS,
  });
});

module.exports = router;