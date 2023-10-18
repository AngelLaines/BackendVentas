const debug = require("debug")("app:module-sales-controller")
const { SalesService } = require('./services');
const {Response}  =require('../common/response');
const createError = require("http-errors");
module.exports.SalesController = {
    getAll: async (req, res) => {
        try {
            const sales = await SalesService.getAll();
            if (sales.length===0) {
                Response.error(res,{statusCode:404,message:'No hay ventas registradas'});
                return;
            }
            Response.success(res,200,"OK",sales);
        } catch (error) {
            console.log(error);
            debug(error);
            Response.error(res);
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const sale = await SalesService.getById(id);
            
            if (sale===undefined || sale.length===0)  {
                Response.error(res,{ statusCode:404, message:"No se pudo encontrar la venta o no hay ventas registradas" });
                return;
            }
            Response.success(res,200,"OK",sale);
        } catch (error) {
            console.log(error);
            debug(error)
            Response.error(res);
        }
    },
    create: async (req, res) => {
        try {
            const { body } = req;
            const { idProducto,precio,cantidad,fecha } = body;
            if (idProducto===undefined || precio===undefined || cantidad===undefined || fecha===undefined ||
                idProducto==="" || precio==="" || cantidad==="" || fecha==="") {
                Response.error(res,{statusCode:400,message:"Los campos requeridos no existen o estan vacios"});
                return;
            }

            const id = await SalesService.create(body);
            console.log(id);
            if(id===400){
                Response.error(res,{statusCode:id,message:"Hubo un error al intentar guardar los archivos: Bad request"});
                return;
            }

            Response.success(res,201,"Created",{ id,idProducto,precio,cantidad,fecha });    
            
        } catch (error) {
            debug(error);
            console.log(error);
            Response.error(res);
        }
    },
    
    // update 
    update:async(req,res)=>{
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
    delete:async(req,res)=>{
        try {
            const {params:{id}} = req;
            let sale = await SalesService.getById(id);
            console.log(sale);
            if (sale) {
                let status = await SalesService.remove(id);
                Response.success(res,status,"Sale deleted",);
            } else {
                Response.error(res, new createError.NotFound());
            }
        } catch (error) {
            debug(error);
            console.log(error);
            Response.error(res);
        }
    } 
}