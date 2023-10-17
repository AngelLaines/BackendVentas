const express = require('express');
const {ProductsController} = require('./controller');
const router = express.Router();

module.exports.ProductsAPI = (app) => {
    router
    .get("/", ProductsController.getProducts)
    .get("/report",ProductsController.generateResponse)
    .get("/:id", ProductsController.getProduct)
    .post("/", ProductsController.createProduct)
    // update
    .put("/:id",ProductsController.updateProduct)
    // delete 
    .delete("/:id",ProductsController.deleteProduct);
    app.use("/api/products",router)
}