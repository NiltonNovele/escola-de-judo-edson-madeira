const { ADMIN_API_KEY } = require("../config");
const { safeTimingEqual } = require("../utils");

function adminAuth(req, res, next) {
  if (!ADMIN_API_KEY) {
    return res.status(503).json({
      status: "error",
      message: "Admin API key is not configured on the server.",
    });
  }

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token || !safeTimingEqual(token, ADMIN_API_KEY)) {
    return res.status(401).json({
      status: "error",
      message: "Invalid or missing admin credentials.",
    });
  }

  return next();
}

module.exports = adminAuth;
