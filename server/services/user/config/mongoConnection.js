const { MongoClient, ServerApiVersion } = require('mongodb');

const url = process.env.MONGO_SERVER;
const dbName = 'P3-C2-UserDb';

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

function getDb() {
  return db;
}

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDb');
    db = client.db(dbName);

  } catch (error) {
    console.log(error);
    await client.close();
  }
}

module.exports = { getDb, connect };
