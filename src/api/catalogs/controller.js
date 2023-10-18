const debug = require("debug")("app:module-sales-controller")
const { CatalogsService:  CatalogsService } = require('./services');
const {Response}  =require('../common/response');
const createError = require("http-errors");
module.exports.CatalogsController = {
    getCatalogs: async (req, res) => {
        try {
            const games = await CatalogsService.getAll();
            //console.log(games);
            Response.success(res,200,"OK",games);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getCatalog: async (req, res) => {
        try {
            const id = req.params.id;
            const game = await CatalogsService.getById(id);
            console.log(game);
            if (game===undefined) {
                Response.error(res,{ statusCode:404, message:"Juego no encontrado" });
                return;
            }
            Response.success(res,200,"OK",game);
        } catch (error) {
            debug(error)
            Response.error(res);
        }
    },
    createCatalog: async (req, res) => {
        try {
            const { body } = req;
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    
    // update 
    updateCatalog:async(req,res)=>{
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
    deleteCatalog:async(req,res)=>{
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