const { MongoClient } = require('mongodb');
const { mongoDbPassword, mongoDbUsername, databaseName } = require('../config.json');
const uri = `mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@cluster0.mvaze.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const mongoDbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function dropDatabaseCollection(collection) {

	try {
		await mongoDbClient.connect();
		console.log('Connected correctly to server');
		const database = mongoDbClient.db(databaseName);
		await database.dropCollection(collection);
	}
	catch (err) {
		console.log(err.stack);
	}
	finally {
		await mongoDbClient.close();
	}
}

module.exports.dropDatabaseCollection = dropDatabaseCollection;