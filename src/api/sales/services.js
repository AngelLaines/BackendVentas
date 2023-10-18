const { Sales }= require("../common/sales");

const getAll = async () => {
    console.log(Sales.getSales());
    return Sales.getSales();
}

const getById = async (id) => {
    console.log(Sales.getSaleById(+id));
    return Sales.getSaleById(+id);
}

const create = async(product)=>{
    const id = Sales.createSale(product);
    return id;
}

// update
const update = async (id,body)=>{
    
    return ;
}
// delete 
const remove = async (id)=>{
    
    return Sales.removeSale(id);
}
module.exports.SalesService = {
    getAll,
    getById,
    create,
    update,
    remove,
}