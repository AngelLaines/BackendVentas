const {ObjectId, Collection} = require('mongodb');
const { Database } = require('../database/index');

const COLLECTION = "sales";

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getByName = async (user) => {
    const collection = await Database(COLLECTION);
    return await collection.find({ user: user }).toArray();
}

const createSale = async(body)=>{
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(body);
    return result.insertedId;
}


module.exports.SalesService = {
    getAll,
    getByName,
    createSale,
}