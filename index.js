const express = require("express");
const deb = require("debug")("app:main");
const { Config } = require("./src/config/index");
const {SalesAPI} =require('./src/catalogs/index');
const app = express();

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Autorization");
    next()
});
SalesAPI(app);
// modulos

app.listen(Config.port, () => {
    deb(`Server listening in port ${Config.port}`);
});