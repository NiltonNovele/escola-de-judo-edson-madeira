const crypto = require("crypto");

function buildReference(prefix) {
  const stamp = Date.now().toString().slice(-8);
  const rand = crypto.randomInt(0, 10000).toString().padStart(4, "0");
  return `${prefix}${stamp}${rand}`.slice(0, 50);
}

function isValidReturnUrl(url, allowedOrigins) {
  try {
    const parsed = new URL(url);
    return allowedOrigins.includes(parsed.origin);
  } catch {
    return false;
  }
}

function parseBoolean(value) {
  return value === true || value === "true";
}

function safeJsonArray(value) {
  try {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeTimingEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ""), "utf8");
  const rightBuffer = Buffer.from(String(right || ""), "utf8");

  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function truncate(value, max) {
  return String(value || "").slice(0, max);
}

module.exports = {
  buildReference,
  isValidReturnUrl,
  parseBoolean,
  safeJsonArray,
  safeTimingEqual,
  truncate,
};