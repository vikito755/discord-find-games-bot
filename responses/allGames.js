const { allGames } = require('../games.json')

// Precompiling all lists on deploy so they are not getting calculated every time.
let allGamesResponse = `All games: \n ${allGames.join('\n\n')}`;

console.log('List of all games compiled.')

module.exports.allGamesResponse = allGamesResponse;