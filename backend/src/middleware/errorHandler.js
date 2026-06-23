function errorHandler(error, _req, res, _next) {
  console.error(error);

  res.status(500).json({
    status: "error",
    message: error.message || "Internal server error",
  });
}

module.exports = errorHandler;
