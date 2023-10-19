const express = require('express');
const {SalesController: SalesController} = require('./controller');
const router = express.Router();

module.exports.SalesAPI = (app) => {
    router
    .get("/:file", SalesController.getAll)
    .get("/:id/:file", SalesController.getById)
    .post("/:file", SalesController.create)
    .post('/many/:file', SalesController.createMany)
    // update
    .put("/:id/:file",SalesController.update)
    // delete 
    .delete("/:id/:file",SalesController.delete);
    app.use("/api/sales",router)
}