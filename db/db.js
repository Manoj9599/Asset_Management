const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoURI = process.env.MONGO_URL;
const client = new MongoClient(mongoURI);
let database = null;

async function connectToMongo() {
  try {
    await client.connect();
    database = client.db("asset-management");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function getDatabase() {
  return database;
}

module.exports = {
  connectToMongo,
  getDatabase,
};
