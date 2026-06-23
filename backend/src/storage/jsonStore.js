const fs = require("fs");
const path = require("path");
const { DATA_DIR, DATA_FILES, PROOFS_DIR, UPLOAD_DIR } = require("../config");

function ensureStorage() {
  for (const dir of [DATA_DIR, UPLOAD_DIR, PROOFS_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  for (const file of Object.values(DATA_FILES)) {
    if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf8");
  }
}

function readJsonArray(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeJsonArray(filePath, data) {
  const tempFile = path.join(
    path.dirname(filePath),
    `.${path.basename(filePath)}.${process.pid}.${Date.now()}.tmp`
  );

  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tempFile, filePath);
}

function appendJsonArray(filePath, entry) {
  const entries = readJsonArray(filePath);
  entries.push(entry);
  writeJsonArray(filePath, entries);
  return entry;
}

module.exports = {
  appendJsonArray,
  ensureStorage,
  readJsonArray,
  writeJsonArray,
};