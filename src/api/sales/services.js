const { Sales }= require("../common/sales");

const getAll = async (file) => {
    console.log(Sales.getSales(file));
    return Sales.getSales(file);
}

const getById = async (id,file) => {
    console.log(Sales.getSaleById(+id,file));
    return Sales.getSaleById(+id,file);
}

const create = async(product,file)=>{
    const id = Sales.createSale(product,file);
    return id;
}

// update
const update = async (id,body)=>{
    
    return ;
}
// delete 
const remove = async (id,file)=>{
    
    return Sales.removeSale(id,file);
}
module.exports.SalesService = {
    getAll,
    getById,
    create,
    update,
    remove,
}