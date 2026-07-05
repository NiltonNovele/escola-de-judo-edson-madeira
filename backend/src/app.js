const express = require("express");
const cors = require("cors");
const { ALLOWED_ORIGINS } = require("./config");
const adminImportRouter = require("./routes/adminImport");
const bankDetailsRouter = require("./routes/bankDetails");
const donationsRouter = require("./routes/donations");
const errorHandler = require("./middleware/errorHandler");
const healthRouter = require("./routes/health");
const partnershipsRouter = require("./routes/partnerships");
const paymentsRouter = require("./routes/payments");
const teamRouter = require("./routes/team");
const webhookRouter = require("./routes/webhook");

function createApp() {
  const app = express();
  app.disable("x-powered-by");

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (ALLOWED_ORIGINS.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    })
  );

  app.use("/api", webhookRouter);
  app.use(express.json({ limit: "30mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", healthRouter);
  app.use("/api", adminImportRouter);
  app.use("/api", bankDetailsRouter);
  app.use("/api", donationsRouter);
  app.use("/api", partnershipsRouter);
  app.use("/api", paymentsRouter);
  app.use("/api", teamRouter);

  app.use(errorHandler);

  return app;
}

module.exports = {
  createApp,
};
