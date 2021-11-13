const { allGames } = require('../games.json')

// Precompiling all lists on deploy so they are not getting calculated every time.
let gameOptions = [];

allGames.map( game => {
    gameOptions.push([game, game]);
});

console.log(gameOptions)

module.exports.gameOptions = gameOptions;