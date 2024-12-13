const { MongoClient } = require('mongodb');
require('dotenv').config()

const uri = process.env.MONGODB_URL
let client;
let database;

const connectToDB = async () => {
    if (!client) {
        client = new MongoClient(uri)
        await client.connect()
        database = client.db('crm')
    }
    return database;
}

const getDataFromDB = async (collectionName) => {
    try {
        console.log(collectionName);
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection.find({}).toArray()
        return data
    } catch (err) {
        console.error('Error retrieving data:', error);
        throw err;
    }

};

module.exports = { getDataFromDB }