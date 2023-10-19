const debug = require("debug")("app:module-sales-controller")
const { SalesService } = require('./services');
const { Response } = require('../common/response');
const createError = require("http-errors");

const fileErrorResponse = () => {
    Response.error(res, { statusCode: 404, message: 'No se ha especificado el archivo en la ruta' });
}

module.exports.SalesController = {
    getAll: async (req, res) => {
        try {
            const { params: { file } } = req;
            if (file) {
                console.log(file);
                const sales = await SalesService.getAll(file);
                if (sales.length === 0) {
                    Response.error(res, { statusCode: 404, message: 'No hay ventas registradas' });
                    return;
                }
                Response.success(res, 200, "OK", sales);
            } else {
                fileErrorResponse();
                return;
            }
        } catch (error) {
            console.log(error);
            debug(error);
            Response.error(res);
        }
    },
    getById: async (req, res) => {
        try {
            const { id, file } = req.params;
            if (file) {
                const sale = await SalesService.getById(id, file);

                if (sale === undefined || sale.length === 0) {
                    Response.error(res, { statusCode: 404, message: "No se pudo encontrar la venta o no hay ventas registradas" });
                    return;
                }
                Response.success(res, 200, "OK", sale);
            } else {
                fileErrorResponse();
                return
            }
        } catch (error) {
            console.log(error);
            debug(error)
            Response.error(res);
        }
    },
    create: async (req, res) => {
        try {
            const { body } = req;
            const { params: { file } } = req;
            if (file) {
                const { idProducto, precio, cantidad, fecha } = body;
                if (idProducto === undefined || precio === undefined || cantidad === undefined || fecha === undefined ||
                    idProducto === "" || precio === "" || cantidad === "" || fecha === "") {
                    Response.error(res, { statusCode: 400, message: "Los campos requeridos no existen o estan vacios" });
                    return;
                }

                const id = await SalesService.create(body, file);
                console.log(id);
                if (id === 400) {
                    Response.error(res, { statusCode: id, message: "Hubo un error al intentar guardar los archivos: Bad request" });
                    return;
                }
                Response.success(res, 201, "Created", { id, idProducto, precio, cantidad, fecha });
            } else {
                fileErrorResponse();
            }


        } catch (error) {
            debug(error);
            console.log(error);
            Response.error(res);
        }
    },
    createMany: async (req, res) => {
        try {
            const { params: { file } } = req;
            if (file) {
                const { arrays } = req.body;
                if (Array.isArray(arrays)) {
                    if (arrays.length===0) {
                        Response.error(res, { statusCode: 400, message: "No hay ventas que registrar" });
                        return;
                    }
                    for (const sale of arrays) {
                        console.log(sale);
                        const { idProducto, precio, cantidad, fecha } = sale;
                        if (idProducto === undefined || precio === undefined || cantidad === undefined || fecha === undefined ||
                            idProducto === "" || precio === "" || cantidad === "" || fecha === "") {
                            Response.error(res, { statusCode: 400, message: "Los campos requeridos no existen o estan vacios" });
                            return;
                        }

                        await SalesService.create(sale, file);
                    }
                    Response.success(res, 201, "Created", arrays);
                } else {
                    Response.error(res, { statusCode: 404, message: "La propiedad recibida no es un arreglo" });
                }

            } else {
                fileErrorResponse();
            }
        } catch (error) {
            debug(error);
            console.log(error);
            Response.error(res);
        }
    },
    // update 
    update: async (req, res) => {
        try {

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    // delete
    delete: async (req, res) => {
        try {
            const { params: { id, file } } = req;
            if (file) {
                let sale = await SalesService.getById(id, file);
                console.log(sale);
                if (sale) {
                    let status = await SalesService.remove(id, file);
                    Response.success(res, status, "Sale deleted",);
                } else {
                    Response.error(res, new createError.NotFound());
                }
            } else {
                fileErrorResponse();
            }
        } catch (error) {
            debug(error);
            console.log(error);
            Response.error(res);
        }
    }
}