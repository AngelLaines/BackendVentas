const debug = require("debug")("app:module-sales-controller")
const { SalesService } = require('./services');
const {Response}  =require('../common/response');
const createError = require("http-errors");
const {ProductsService} = require("../products/services");
const {UsersService} = require('../users/services');

module.exports.SalesController={
    getAll:async(req,res)=>{
        try {
            Response.success(res,200,"All sales obtained successfully",await SalesService.getAll());
        } catch (error) {
            Response.error(error);
        }
    },
    getById:async(req,res)=>{ // this is diferent, this method return all sales of client
        try {
            const {params:{id}} = req;
            let user = await UsersService.getById(id);
            console.log(user);
            Response.success(res,200,`Sales obtained successfully. ${user.name}`,await SalesService.getByName(user.name));
        } catch (error) {
            Response.error(error);
        }
    },
    createSale:async(req,res)=>{
        try {
            const {params:{id}}=req;
            const {body} = req;
            if (Object.values(body).length===2) {
                const fechaActual = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
                const producto = await ProductsService.getById(body.productId);
                const user= await UsersService.getById(id);
                if (producto.cantidad>=body.cantidad) {
                    const sale = {
                        productId: body.productId,
                        cantidad: body.cantidad,
                        unitPrice: producto.precio,
                        subtotal: producto.precio*body.cantidad,
                        user: user.name,
                        date: fechaActual
                    };
                    producto.cantidad -= body.cantidad;
                    delete producto._id;
                    const updateProduct = await ProductsService.updateProduct(body.productId,producto);
                    Response.success(res,200,"Sale successfuly",await SalesService.createSale(sale))
                } else {
                    Response.error(res,new createError.Conflict());
                }
            } else {
                Response.error(res, new createError.LengthRequired());
            }
        } catch (error) {
            Response.error(error);
        }
    }
}