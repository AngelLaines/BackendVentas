const fs = require('node:fs');

const filePath = "../../db/games.json";
let gamesArray = [];
let games = {};

const getGames = () => {
    console.log(`${__dirname}/${filePath}`);
    games = fs.readFileSync(`${__dirname}/${filePath}`,'utf-8');
    return JSON.parse(games);
}
const getGameById = (id)=>{
    const games = getGames();
    return games.find(game => game.id === id);
}

module.exports.Games = {
    gamesArray,
    getGames,
    getGameById,
};