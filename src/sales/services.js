const { Games }= require("../common/games");

const getAll = async () => {
    console.log(Games.getGames());
    return Games.getGames();
}

const getById = async (id) => {
    
    return ;
}

const create = async(product)=>{
    
    return ;
}

// update
const updateSale = async (id,body)=>{
    
    return ;
}
// delete 
const deleteSale = async (id)=>{
    
    return ;
}
module.exports.SalesService = {
    getAll,
    getById,
    create,
    updateSale,
    deleteSale,
}