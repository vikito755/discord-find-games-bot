const { allGames } = require('../games.json')
const { normaliseCommandName } = require('../utilities/names');

class GameLobby
{
    constructor(params)
    {
        this.game=params.game;
        this.amountOfPlayers=params.amountOfPlayers;
        this.currentPlayers = [];
        
        console.log('constructor of GameLobby class called: ');
        // console.log(this.game+' is your game.');
        // console.log(this.amountOfPlayers+' is your language');
    }

    addPlayer() {
        this.currentPlayers.push("New player ID");
      }
}

// const gameLobbies = {

// };

// allGames.map( game => {
//     console.log(game);
    
//     console.log(allGames[game]);
//     Object.assign(gameLobbies, new GameLobby({game: game, amountOfPlayers: 5 }));
// })
// console.log("  ");
// console.log(gameLobbies);

module.exports.GameLobby = GameLobby;