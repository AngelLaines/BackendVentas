const debug = require("debug")("app:module-sales-controller")
const { SalesService:  SalesService } = require('./services');
const {Response}  =require('../common/response');
const createError = require("http-errors");
module.exports.SalesController = {
    getSales: async (req, res) => {
        try {
            const games = await SalesService.getAll();
            //console.log(games);
            Response.success(res,200,"OK",games);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getSale: async (req, res) => {
        try {
            
        } catch (error) {
            debug(error)
            Response.error(res);
        }
    },
    createSale: async (req, res) => {
        try {
            const { body } = req;
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    
    // update 
    updateSale:async(req,res)=>{
        try {
            const {params:{id}}=req;
            const {body} =req;
            console.log(body);
            if (await UsersService.getById(id)) {
                
            } else {
                Response.error(res, new createError.NotFound());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    // delete
    deleteSale:async(req,res)=>{
        try {
            const {params:{id}} = req;
            if (await UsersService.getById(id)) {
                
                Response.success(res,200,"User deleted",result);
            } else {
                Response.error(res, new createError.NotFound());
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    } 
}