const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const DATA_DIR = path.join(__dirname, "data");
const UPLOAD_DIR = path.join(__dirname, "uploads");
const PROOFS_DIR = path.join(UPLOAD_DIR, "proofs");

for (const dir of [DATA_DIR, UPLOAD_DIR, PROOFS_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const DONATIONS_FILE = path.join(DATA_DIR, "donations.json");
const PARTNERSHIPS_FILE = path.join(DATA_DIR, "partnerships.json");
const WEBHOOK_LOG_FILE = path.join(DATA_DIR, "webhooks.json");

for (const file of [DONATIONS_FILE, PARTNERSHIPS_FILE, WEBHOOK_LOG_FILE]) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf8");
}

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((v) => v.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use("/uploads", express.static(UPLOAD_DIR));

const upload = multer({
  storage: multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, PROOFS_DIR);
    },
    filename: function (_req, file, cb) {
      const ext = path.extname(file.originalname);
      const safeBase = path
        .basename(file.originalname, ext)
        .replace(/[^a-zA-Z0-9-_]/g, "_");
      cb(null, `${Date.now()}-${safeBase}${ext}`);
    },
  }),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: function (_req, file, cb) {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Unsupported file type. Use JPG, PNG, WEBP, or PDF."));
  },
});

app.post(
  "/api/paysuite/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["x-webhook-signature"];
      const secret = process.env.PAYSUITE_WEBHOOK_SECRET || "";

      if (!signature || !secret) {
        return res.status(400).json({
          status: "error",
          message: "Missing webhook signature or secret.",
        });
      }

      const payloadBuffer = req.body;
      const calculatedSignature = crypto
        .createHmac("sha256", secret)
        .update(payloadBuffer)
        .digest("hex");

      if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(calculatedSignature))) {
        return res.status(401).json({
          status: "error",
          message: "Invalid webhook signature.",
        });
      }

      const payload = JSON.parse(payloadBuffer.toString("utf8"));
      const webhookEntries = readJsonFile(WEBHOOK_LOG_FILE);

      const alreadyProcessed = webhookEntries.some(
        (item) => item.request_id === payload.request_id
      );

      if (!alreadyProcessed) {
        webhookEntries.push({
          received_at: new Date().toISOString(),
          ...payload,
        });
        writeJsonFile(WEBHOOK_LOG_FILE, webhookEntries);

        const donations = readJsonFile(DONATIONS_FILE);
        const donationIndex = donations.findIndex(
          (item) => item.reference === payload?.data?.reference
        );

        if (donationIndex !== -1) {
          if (payload.event === "payment.success") {
            donations[donationIndex].paymentStatus = "paid";
            donations[donationIndex].paymentDetails = payload.data;
            donations[donationIndex].updatedAt = new Date().toISOString();
          } else if (payload.event === "payment.failed") {
            donations[donationIndex].paymentStatus = "failed";
            donations[donationIndex].paymentDetails = payload.data;
            donations[donationIndex].updatedAt = new Date().toISOString();
          }
          writeJsonFile(DONATIONS_FILE, donations);
        }
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

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Backend running",
    port: PORT,
  });
});

app.get("/api/bank-details", (_req, res) => {
  res.json({
    status: "success",
    data: {
      bankName: process.env.BANK_NAME || "Banco Exemplo",
      accountName:
        process.env.BANK_ACCOUNT_NAME || "Escola de Judo Edson Madeira",
      accountNumber: process.env.BANK_ACCOUNT_NUMBER || "0000000000",
      iban: process.env.BANK_IBAN || "",
      swift: process.env.BANK_SWIFT || "",
      branch: process.env.BANK_BRANCH || "",
      note:
        process.env.BANK_TRANSFER_NOTE ||
        "Após a transferência, envie o comprovativo neste formulário.",
    },
  });
});

app.post("/api/donations/create-payment", async (req, res) => {
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
    } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Amount must be greater than zero.",
      });
    }

    const methodMap = {
      "M-Pesa": "mpesa",
      "e-Mola": "emola",
      Cartão: "credit_card",
    };

    const mappedMethod = methodMap[paymentMethod];
    if (!mappedMethod) {
      return res.status(400).json({
        status: "error",
        message: "Unsupported PaySuite payment method.",
      });
    }

    const reference = buildReference("DON");
    const description = truncate(
      `Doação EJEM${message ? ` - ${message}` : ""}`,
      125
    );

    const payload = {
      amount: Number(amount),
      method: mappedMethod,
      reference,
      description,
      return_url:
        process.env.PAYSUITE_RETURN_URL ||
        `${process.env.FRONTEND_URL || "http://localhost:3000"}/donate?payment=return`,
      callback_url:
        process.env.PAYSUITE_CALLBACK_URL ||
        `${process.env.PUBLIC_BACKEND_URL || `http://localhost:${PORT}`}/api/paysuite/webhook`,
    };

    const response = await fetch(
      `${process.env.PAYSUITE_BASE_URL || "https://paysuite.tech"}/api/v1/payments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSUITE_API_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        status: "error",
        message: result?.message || "Failed to create payment request.",
        providerResponse: result,
      });
    }

    const donations = readJsonFile(DONATIONS_FILE);

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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    writeJsonFile(DONATIONS_FILE, donations);

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

app.post("/api/donations/bank-transfer", upload.single("proof"), async (req, res) => {
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

    const reference = transferReference || buildReference("BANK");

    const donations = readJsonFile(DONATIONS_FILE);
    donations.push({
      id: crypto.randomUUID(),
      reference,
      type: "bank_transfer",
      donationMode: donationMode || "money",
      donorName: anonymousDonation === "true" || anonymousDonation === true ? "" : donorName || "",
      donorContact:
        anonymousDonation === "true" || anonymousDonation === true ? "" : donorContact || "",
      anonymousDonation:
        anonymousDonation === "true" || anonymousDonation === true,
      amount: Number(amount),
      paymentMethod: "Transferência Bancária",
      paymentStatus: "proof_submitted",
      message: message || "",
      selectedGoods: safeParseJsonArray(selectedGoods),
      otherDonation: otherDonation || "",
      deliveryMethod: deliveryMethod || "",
      proofFileName: req.file.filename,
      proofOriginalName: req.file.originalname,
      proofUrl: `/uploads/proofs/${req.file.filename}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    writeJsonFile(DONATIONS_FILE, donations);

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

app.post("/api/donations/non-money", async (req, res) => {
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

    const donations = readJsonFile(DONATIONS_FILE);
    const reference = buildReference("SUP");

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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    writeJsonFile(DONATIONS_FILE, donations);

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

app.post("/api/partnerships", async (req, res) => {
  try {
    const data = req.body;

    const partnerships = readJsonFile(PARTNERSHIPS_FILE);
    const reference = buildReference("PAR");

    partnerships.push({
      id: crypto.randomUUID(),
      reference,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    writeJsonFile(PARTNERSHIPS_FILE, partnerships);

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

app.get("/api/payments/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.PAYSUITE_BASE_URL || "https://paysuite.tech"}/api/v1/payments/${req.params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSUITE_API_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const result = await response.json();

    return res.status(response.status).json(result);
  } catch (error) {
    console.error("Get payment error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while fetching payment.",
    });
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    status: "error",
    message: error.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function readJsonFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw || "[]");
  } catch (_err) {
    return [];
  }
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function buildReference(prefix) {
  const stamp = Date.now().toString().slice(-8);
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}${stamp}${rand}`.slice(0, 50);
}

function truncate(value, max) {
  return String(value || "").slice(0, max);
}

function safeParseJsonArray(value) {
  try {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return JSON.parse(value);
  } catch (_error) {
    return [];
  }
}