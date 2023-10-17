const debug = require("debug")("app:module-products-controller")
const { ProductsService } = require('./services');
const {Response}  =require('../common/response');
const createError = require("http-errors");
module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(res,200,"Products obtained successfully",products);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            let product = await ProductsService.getById(id);
            if (!product) {
                Response.error(res,new createError.NotFound());
            } else {
                Response.success(res,200,`Product obtained successfully: ${id}`,product);
            }
        } catch (error) {
            debug(error)
            Response.error(res);
        }
    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length===0) {
                Response.error(res,new createError.BadRequest());
            } else {
                const insertedId = await ProductsService.create(body);
                Response.success(res,201,"Product saved successfully",insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    generateResponse:async(req,res)=>{
        try {
            ProductsService.generateReport("Inventario",res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    // update 
    updateProduct:async(req,res)=>{
        try {
            const {params:{id}}=req;
            const {body} =req;
            console.log(body);
            if (await ProductsService.getById(id)) {
                if (Object.values(body).length===3) {
                    const result = await ProductsService.updateProduct(id,body);
                    Response.success(res,201,"Product updated",result);
                } else {
                    Response.error(res, new createError.LengthRequired());
                }
            } else {
                Response.error(res, new createError.NotFound());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    // delete
    deleteProduct:async(req,res)=>{
        try {
            const {params:{id}} = req;
            if (await ProductsService.getById(id)) {
                const result = await ProductsService.deleteProduct(id);
                Response.success(res,200,"Product deleted",result);
            } else {
                Response.error(res, new createError.NotFound());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    } 
}