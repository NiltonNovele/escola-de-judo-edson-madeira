const crypto = require("crypto");
const express = require("express");
const { COLLECTIONS, PAYSUITE } = require("../config");
const { readJsonArray, writeJsonArray } = require("../storage/jsonStore");
const { safeTimingEqual } = require("../utils");

const router = express.Router();

router.post(
  "/paysuite/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["x-webhook-signature"];

      if (!signature || !PAYSUITE.webhookSecret) {
        return res.status(400).json({
          status: "error",
          message: "Missing webhook signature or secret.",
        });
      }

      const payloadBuffer = req.body;
      const calculatedSignature = crypto
        .createHmac("sha256", PAYSUITE.webhookSecret)
        .update(payloadBuffer)
        .digest("hex");

      if (!safeTimingEqual(signature, calculatedSignature)) {
        return res.status(401).json({
          status: "error",
          message: "Invalid webhook signature.",
        });
      }

      const payload = JSON.parse(payloadBuffer.toString("utf8"));
      const webhookEntries = await readJsonArray(COLLECTIONS.webhooks);
      const alreadyProcessed = webhookEntries.some(
        (item) => item.request_id === payload.request_id
      );

      if (!alreadyProcessed) {
        webhookEntries.push({
          received_at: new Date().toISOString(),
          ...payload,
        });
        await writeJsonArray(COLLECTIONS.webhooks, webhookEntries);
        await updateDonationStatus(payload);
      }

      return res.status(200).json({ status: "success" });
    } catch (error) {
      console.error("Webhook error:", error);
      return res.status(500).json({
        status: "error",
        message: "Webhook processing failed.",
      });
    }
  }
);

async function updateDonationStatus(payload) {
  const donations = await readJsonArray(COLLECTIONS.donations);
  const donationIndex = donations.findIndex(
    (item) => item.reference === payload?.data?.reference
  );

  if (donationIndex === -1) return;

  if (payload.event === "payment.success") {
    donations[donationIndex].paymentStatus = "paid";
  } else if (payload.event === "payment.failed") {
    donations[donationIndex].paymentStatus = "failed";
  } else {
    return;
  }

  donations[donationIndex].paymentDetails = payload.data;
  donations[donationIndex].updatedAt = new Date().toISOString();
  await writeJsonArray(COLLECTIONS.donations, donations);
}

module.exports = router;
