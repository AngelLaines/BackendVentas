const fs = require('node:fs');

const filePath = "games.json";
let gamesArray = [];
let games = {};

const getGames = () => {
    console.log(`${__dirname}/${filePath}`);
    games = fs.readFileSync(`${__dirname}/${filePath}`,'utf-8');
    return JSON.parse(games);
}
module.exports.Games = {
    gamesArray,
    getGames
};