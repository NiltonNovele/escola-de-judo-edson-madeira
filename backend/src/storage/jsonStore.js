const { getDb } = require("../db/mongo");

async function readJsonArray(collectionName) {
  const docs = await getDb().collection(collectionName).find({}).toArray();
  return docs.map(stripMongoId);
}

async function writeJsonArray(collectionName, data) {
  const collection = getDb().collection(collectionName);
  await collection.deleteMany({});
  if (data.length > 0) await collection.insertMany(data);
}

async function appendJsonArray(collectionName, entry) {
  await getDb().collection(collectionName).insertOne({ ...entry });
  return entry;
}

function stripMongoId(doc) {
  const { _id, ...rest } = doc;
  return rest;
}

module.exports = {
  appendJsonArray,
  readJsonArray,
  writeJsonArray,
};
