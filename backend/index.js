const { createApp } = require("./src/app");
const { PORT } = require("./src/config");
const { connectDb } = require("./src/db/mongo");

async function start() {
  await connectDb();

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
