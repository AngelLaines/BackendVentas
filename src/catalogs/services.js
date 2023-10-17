const { Games }= require("../common/games");

const getAll = async () => {
    console.log(Games.getGames());
    return Games.getGames();
}

const getById = async (id) => {
    console.log(Games.getGameById(+id));
    return Games.getGameById(+id);
}

const create = async(product)=>{
    
    return ;
}

// update
const updateCatalog = async (id,body)=>{
    
    return ;
}
// delete 
const deleteCatalog = async (id)=>{
    
    return ;
}
module.exports.CatalogsService = {
    getAll,
    getById,
    create,
    updateCatalog,
    deleteCatalog,
}