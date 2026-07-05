const dotenv = require("dotenv");

dotenv.config();

const DEFAULT_ORIGINS = [
  "http://localhost:3000",
  "https://loja.sale",
  "https://www.loja.sale",
  "https://loja-sale.vercel.app",
  "https://www.ejem.org.mz",
];

const PORT = Number(process.env.PORT) || 5000;

const ALLOWED_RETURN_ORIGINS = parseCsv(
  process.env.ALLOWED_RETURN_ORIGINS,
  DEFAULT_ORIGINS
);

const ALLOWED_ORIGINS = parseCsv(process.env.CORS_ORIGINS, DEFAULT_ORIGINS);

const MONGODB_URI = process.env.MONGODB_URI || "";

const COLLECTIONS = {
  donations: "donations",
  partnerships: "partnerships",
  webhooks: "webhooks",
  team: "team",
};

const CLOUDINARY = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  apiKey: process.env.CLOUDINARY_API_KEY || "",
  apiSecret: process.env.CLOUDINARY_API_SECRET || "",
};

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

const BANK_DETAILS = {
  bankName: process.env.BANK_NAME || "Banco Exemplo",
  accountName: process.env.BANK_ACCOUNT_NAME || "Escola de Judo Edson Madeira",
  accountNumber: process.env.BANK_ACCOUNT_NUMBER || "0000000000",
  iban: process.env.BANK_IBAN || "",
  swift: process.env.BANK_SWIFT || "",
  branch: process.env.BANK_BRANCH || "",
  note:
    process.env.BANK_TRANSFER_NOTE ||
    "Após a transferência, envie o comprovativo neste formulário.",
};

const PAYSUITE = {
  baseUrl: process.env.PAYSUITE_BASE_URL || "https://paysuite.tech",
  apiToken: process.env.PAYSUITE_API_TOKEN || "",
  webhookSecret: process.env.PAYSUITE_WEBHOOK_SECRET || "",
  returnUrl:
    process.env.PAYSUITE_RETURN_URL ||
    `${process.env.FRONTEND_URL || "http://localhost:3000"}/donate?payment=success`,
  callbackUrl:
    process.env.PAYSUITE_CALLBACK_URL ||
    `${process.env.PUBLIC_BACKEND_URL || `http://localhost:${PORT}`}/api/paysuite/webhook`,
};

function parseCsv(value, fallback) {
  if (!value) return fallback;

  const entries = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return entries.length > 0 ? entries : fallback;
}

module.exports = {
  ADMIN_API_KEY,
  ALLOWED_ORIGINS,
  ALLOWED_RETURN_ORIGINS,
  BANK_DETAILS,
  CLOUDINARY,
  COLLECTIONS,
  MONGODB_URI,
  PAYSUITE,
  PORT,
};
