const { MongoClient } = require('mongodb');
const debug = require('debug')("app:module-database");

const { Config } = require('../config/index');

var connection = null;

module.exports.Database = (collection) => new Promise(async (resolve, reject) => {
    try {
        if (!connection) {
            const client = new MongoClient(Config.mongo_uri);
            connection = await client.connect();
            debug("New successfully connection with MongoDB Atlas")
        }
        debug("Connection reused");
        const db = connection.db(Config.mongo_dbname);
        console.log("deb");
        resolve(db.collection(collection))
    } catch (error) {
        debug(error);
        reject(error);
    }
});
