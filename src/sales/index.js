const { SalesController } = require('./controller');
const express = require('express');
const router= express.Router();
module.exports.SalesAPI = (app)=>{
    router
        .get("/",SalesController.getAll)
        .get("/:id",SalesController.getById)
        .post("/:id",SalesController.createSale);
        app.use("/api/sales",router);
}