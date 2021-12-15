const { MongoClient } = require('mongodb');
const { mongoDbPassword, mongoDbUsername, databaseName } = require('../config.json');
const uri = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@cluster0.mvaze.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const mongoDbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const maxSizeAndCapPerCollection = 100000;

async function createDatabaseCollection(collection) {

	try {
		await mongoDbClient.connect();
		console.log('Connected correctly to server');
		const database = mongoDbClient.db(databaseName);
		// Create a collection with a size of 1 Megabyte (there are 512 in the free tier of MongoDB Atlas).
		await database.createCollection(collection, { capped: true, max: maxSizeAndCapPerCollection, size: maxSizeAndCapPerCollection });
	}
	catch (err) {
		console.log(err.stack);
	}
	finally {
		await mongoDbClient.close();
	}
}

module.exports.createDatabaseCollection = createDatabaseCollection;