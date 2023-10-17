const express = require('express');
const {CatalogsController: CatalogsController} = require('./controller');
const router = express.Router();

module.exports.SalesAPI = (app) => {
    router
    .get("/", CatalogsController.getCatalogs)
    .get("/:id", CatalogsController.getCatalog)
    .post("/", CatalogsController.createCatalog)
    // update
    .put("/:id",CatalogsController.updateCatalog)
    // delete 
    .delete("/:id",CatalogsController.deleteCatalog);
    app.use("/api/catalogs",router)
}