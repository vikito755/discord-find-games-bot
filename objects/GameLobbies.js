const { allGames } = require('../games.json')

class GameLobby
{
    constructor(params)
    {
        this.game=params.game;
        this.maxPlayers=params.maxPlayers;
        this.currentPlayers = [];
        
        // console.log('Lobby class constructor loads UP! ');    
    }

    // Adds the user tag (based on id), to an array for later use.
    addPlayer(playerID) {
        this.currentPlayers.push(`<@${playerID}>`);
      }

    //   Empties the lobby.
    reset() {
        this.currentPlayers = [];
    }
}

    // Array of GameLobby objects that get filtered later for a specific lobby.
    let gameLobbies = [];

    const numberOfGames = Object.keys(allGames).length;

    for (let i = 0; i < numberOfGames; i++) {

        let gameIdentifier = this[`${allGames[Object.keys(allGames)[i]].name}`];
        
        // Creates a game lobby object for each game.
        gameIdentifier = new GameLobby({game: allGames[Object.keys(allGames)[i]].name, maxPlayers: allGames[Object.keys(allGames)[i]].maxPlayers});

        gameLobbies.push(gameIdentifier);

        // console.log(`GameLobby for ${gameIdentifier} loads up.`);
        
     }

module.exports.gameLobbies = gameLobbies;