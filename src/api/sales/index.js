const express = require('express');
const {SalesController: SalesController} = require('./controller');
const router = express.Router();

module.exports.SalesAPI = (app) => {
    router
    .get("/", SalesController.getAll)
    .get("/:id", SalesController.getById)
    .post("/", SalesController.create)
    // update
    .put("/:id",SalesController.update)
    // delete 
    .delete("/:id",SalesController.delete);
    app.use("/api/sales",router)
}