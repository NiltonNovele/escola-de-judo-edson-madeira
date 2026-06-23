const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT_DIR, "data");
const UPLOAD_DIR = path.join(ROOT_DIR, "uploads");
const PROOFS_DIR = path.join(UPLOAD_DIR, "proofs");

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

const DATA_FILES = {
  donations: path.join(DATA_DIR, "donations.json"),
  partnerships: path.join(DATA_DIR, "partnerships.json"),
  webhooks: path.join(DATA_DIR, "webhooks.json"),
};

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
  ALLOWED_ORIGINS,
  ALLOWED_RETURN_ORIGINS,
  BANK_DETAILS,
  DATA_DIR,
  DATA_FILES,
  PAYSUITE,
  PORT,
  PROOFS_DIR,
  ROOT_DIR,
  UPLOAD_DIR,
};