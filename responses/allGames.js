const { allGames } = require('../games.json')

let allGamesResponse = `All games: \n`;

Object.values(allGames).map( game => {
    allGamesResponse += `${game.name} \n`
});

module.exports.allGamesResponse = allGamesResponse;