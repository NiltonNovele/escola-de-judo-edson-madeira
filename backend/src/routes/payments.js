const express = require("express");
const { getPayment } = require("../services/paysuite");

const router = express.Router();

router.get("/payments/:id", async (req, res) => {
  try {
    const { response, result } = await getPayment(req.params.id);
    return res.status(response.status).json(result);
  } catch (error) {
    console.error("Get payment error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while fetching payment.",
    });
  }
});

module.exports = router;