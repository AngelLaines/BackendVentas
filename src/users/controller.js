const debug = require("debug")("app:module-users-controller")
const { UsersService } = require('./services');
const {Response}  =require('../common/response');
const createError = require("http-errors");
module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            let users = await UsersService.getAll();
            Response.success(res,200,"Users obtained successfully",users);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let user = await UsersService.getById(id);
            if (!user) {
                Response.error(res,new createError.NotFound());
            } else {
                Response.success(res,200,`User obtained successfully: ${id}`,user);
            }
        } catch (error) {
            debug(error)
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length===0) {
                Response.error(res,new createError.BadRequest());
            } else {
                const insertedId = await UsersService.create(body);
                Response.success(res,201,"User saved successfully",insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    
    // update 
    updateUser:async(req,res)=>{
        try {
            const {params:{id}}=req;
            const {body} =req;
            console.log(body);
            if (await UsersService.getById(id)) {
                if (Object.values(body).length===3) {
                    const result = await UsersService.updateUser(id,body);
                    Response.success(res,201,"user updated",result);
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
    deleteUser:async(req,res)=>{
        try {
            const {params:{id}} = req;
            if (await UsersService.getById(id)) {
                const result = await UsersService.deleteUser(id);
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