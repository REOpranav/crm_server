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

const getDataFromDB = async (collectionName) => { // getting total data
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.find({}).toArray()
        return data
    } catch (err) {
        console.error('Error retrieving data:', err);
        throw err;
    }
};

const getParticularclient = async (collectionName, clientID) => { // getting total data
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.find({ "id": `${clientID}` }).toArray()
        return data
    } catch (err) {
        console.error('Error retrieving data:', err);
        throw err;
    }
};

const deleteLead = async (collectionName, clientID) => { // delete data from leads
    try {
        const getDatabaseCollection = await connectToDB()
        const collection = getDatabaseCollection?.collection(collectionName)
        const data = await collection?.deleteOne({ "id": `${clientID}` })
        return data
    } catch (err) {
        console.error('Error retrieving data:', err);
        throw err;
    }
};



module.exports = { getDataFromDB, getParticularclient, deleteLead }