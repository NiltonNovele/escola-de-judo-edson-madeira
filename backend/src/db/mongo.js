const { MongoClient } = require("mongodb");
const { MONGODB_URI } = require("../config");

let client;
let db;

async function connectDb() {
  if (db) return db;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db();

  return db;
}

function getDb() {
  if (!db) {
    throw new Error("Database not connected yet. Call connectDb() first.");
  }

  return db;
}

module.exports = { connectDb, getDb };
