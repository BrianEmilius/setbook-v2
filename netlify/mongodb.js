const MONGO_URI = process.env.MONGO_URI
const MONGO_DB = process.env.MONGO_DB

var MongoClient = require("mongodb").MongoClient

var cachedDb = null

async function connectToDatabase() {
	if (cachedDb) return cachedDb

	var client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
	cachedDb = client.db(MONGO_DB)
	return cachedDb
}

module.exports = connectToDatabase
