const express = require("express");
const deb = require("debug")("app:main");
const { Config } = require("./src/config/index");
const {ProductsAPI} = require("./src/products/index");
const {UsersAPI} = require('./src/users/index');
const {SalesAPI} =require('./src/sales/index');
const app = express();

app.use(express.json());


ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
// modulos

app.listen(Config.port, () => {
    deb(`Server listening in port ${Config.port}`);
});