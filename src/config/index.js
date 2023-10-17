require('dotenv').config();

module.exports.Config={
    port:process.env.PORT,
    mongo_uri:process.env.MONGO_URI,
    mongo_dbname:process.env.MONGO_DBNAME,
};