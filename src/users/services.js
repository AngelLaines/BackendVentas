const {ObjectId, Collection} = require('mongodb');
const { Database } = require('../database/index');

const COLLECTION = "users";

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ _id: new ObjectId(id) });
}

const create = async(product)=>{
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

// update
const updateUser = async (id,body)=>{
    const collection = await Database(COLLECTION);
    const filter = {_id:new ObjectId(id)};
    const options = {upset:false}
    return await collection.updateOne(filter,{$set:body},options);
}
// delete 
const deleteUser = async (id)=>{
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({_id:new ObjectId(id)});
}
module.exports.UsersService = {
    getAll,
    getById,
    create,
    updateUser,
    deleteUser,
}