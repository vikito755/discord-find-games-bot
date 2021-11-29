const { allGames } = require('../games.json')

// Precompiling all lists on deploy so they are not getting calculated every time.
let gameOptions = [];

Object.values(allGames).map( game => {
    gameOptions.push([game.name, game.name]);
});

console.log("Game options loaded");

module.exports.gameOptions = gameOptions;