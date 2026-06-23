const crypto = require("crypto");
const express = require("express");
const { ALLOWED_RETURN_ORIGINS, DATA_FILES, PAYSUITE } = require("../config");
const upload = require("../middleware/upload");
const { createPayment } = require("../services/paysuite");
const { readJsonArray, writeJsonArray } = require("../storage/jsonStore");
const {
  buildReference,
  isValidReturnUrl,
  parseBoolean,
  safeJsonArray,
  truncate,
} = require("../utils");

const router = express.Router();

const methodMap = {
  "M-Pesa": "mpesa",
  "e-Mola": "emola",
  Cartão: "credit_card",
};

router.post("/donations/create-payment", async (req, res) => {
  try {
    const {
      donorName,
      donorContact,
      anonymousDonation,
      amount,
      paymentMethod,
      message,
      donationMode,
      selectedGoods,
      otherDonation,
      deliveryMethod,
      returnUrl,
    } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Amount must be greater than zero.",
      });
    }

    const mappedMethod = methodMap[paymentMethod];
    if (!mappedMethod) {
      return res.status(400).json({
        status: "error",
        message: "Unsupported PaySuite payment method.",
      });
    }

    const reference = buildReference("DON");
    const description = truncate(`${message ? ` - ${message}` : ""}`, 125);
    const finalReturnUrl =
      returnUrl && isValidReturnUrl(returnUrl, ALLOWED_RETURN_ORIGINS)
        ? returnUrl
        : PAYSUITE.returnUrl;

    const { response, result } = await createPayment({
      amount: Number(amount),
      method: mappedMethod,
      reference,
      description,
      return_url: finalReturnUrl,
      callback_url: PAYSUITE.callbackUrl,
    });

    if (!response.ok) {
      return res.status(response.status).json({
        status: "error",
        message: result?.message || "Failed to create payment request.",
        providerResponse: result,
      });
    }

    const donations = readJsonArray(DATA_FILES.donations);
    const now = new Date().toISOString();

    donations.push({
      id: crypto.randomUUID(),
      reference,
      type: "money",
      donationMode,
      donorName: anonymousDonation ? "" : donorName || "",
      donorContact: anonymousDonation ? "" : donorContact || "",
      anonymousDonation: Boolean(anonymousDonation),
      amount: Number(amount),
      paymentMethod,
      providerMethod: mappedMethod,
      paymentRequestId: result?.data?.id,
      checkoutUrl: result?.data?.checkout_url || "",
      paymentStatus: result?.data?.status || "pending",
      message: message || "",
      selectedGoods: selectedGoods || [],
      otherDonation: otherDonation || "",
      deliveryMethod: deliveryMethod || "",
      createdAt: now,
      updatedAt: now,
    });

    writeJsonArray(DATA_FILES.donations, donations);

    return res.status(201).json({
      status: "success",
      data: {
        reference,
        paymentRequestId: result?.data?.id,
        checkoutUrl: result?.data?.checkout_url,
        paymentStatus: result?.data?.status,
      },
    });
  } catch (error) {
    console.error("Create payment error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while creating payment.",
    });
  }
});

router.post("/donations/bank-transfer", upload.single("proof"), async (req, res) => {
  try {
    const {
      donorName,
      donorContact,
      anonymousDonation,
      amount,
      message,
      donationMode,
      selectedGoods,
      otherDonation,
      deliveryMethod,
      transferReference,
    } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Amount must be greater than zero.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Proof of transfer is required.",
      });
    }

    const donations = readJsonArray(DATA_FILES.donations);
    const reference = transferReference || buildReference("BANK");
    const isAnonymous = parseBoolean(anonymousDonation);
    const now = new Date().toISOString();

    donations.push({
      id: crypto.randomUUID(),
      reference,
      type: "bank_transfer",
      donationMode: donationMode || "money",
      donorName: isAnonymous ? "" : donorName || "",
      donorContact: isAnonymous ? "" : donorContact || "",
      anonymousDonation: isAnonymous,
      amount: Number(amount),
      paymentMethod: "Transferência Bancária",
      paymentStatus: "proof_submitted",
      message: message || "",
      selectedGoods: safeJsonArray(selectedGoods),
      otherDonation: otherDonation || "",
      deliveryMethod: deliveryMethod || "",
      proofFileName: req.file.filename,
      proofOriginalName: req.file.originalname,
      proofUrl: `/uploads/proofs/${req.file.filename}`,
      createdAt: now,
      updatedAt: now,
    });

    writeJsonArray(DATA_FILES.donations, donations);

    return res.status(201).json({
      status: "success",
      message: "Proof of transfer submitted successfully.",
      data: {
        reference,
        proofUrl: `/uploads/proofs/${req.file.filename}`,
      },
    });
  } catch (error) {
    console.error("Bank transfer submission error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while submitting transfer proof.",
    });
  }
});

router.post("/donations/non-money", async (req, res) => {
  try {
    const {
      donorName,
      donorContact,
      message,
      donationMode,
      selectedGoods,
      otherDonation,
      deliveryMethod,
    } = req.body;

    const donations = readJsonArray(DATA_FILES.donations);
    const reference = buildReference("SUP");
    const now = new Date().toISOString();

    donations.push({
      id: crypto.randomUUID(),
      reference,
      type: "non_money",
      donationMode: donationMode || "goods",
      donorName: donorName || "",
      donorContact: donorContact || "",
      selectedGoods: selectedGoods || [],
      otherDonation: otherDonation || "",
      deliveryMethod: deliveryMethod || "",
      message: message || "",
      paymentStatus: "not_applicable",
      createdAt: now,
      updatedAt: now,
    });

    writeJsonArray(DATA_FILES.donations, donations);

    return res.status(201).json({
      status: "success",
      message: "Support submission sent successfully.",
      data: { reference },
    });
  } catch (error) {
    console.error("Non-money donation error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while saving support request.",
    });
  }
});

module.exports = router;