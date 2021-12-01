const { allGames } = require('../games.json')
const { millisecondsBeforeLobbyReset } = require('../constants.json');

class GameLobby
{
    constructor(params)
    {
        this.game=params.game;
        this.maxPlayers=params.maxPlayers;
        this.currentPlayers = [];
        this.timer;

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


    // This function starts the timer, ends and clears the array if it if it is stale and clears the array of players.
    startTimer() {
        this.timer = setTimeout( () => {
            console.log("Resetting lobby.");
            this.reset();
            console.log("Stopping the timer.");
            clearTimeout(this.timer);
            // Currently set to 30 minutes from 'constants.json'.
        }, millisecondsBeforeLobbyReset)
    }

    // This function manually stops the timer. For the case when the lobby is filled up.
    stopTimer() {
        console.log("Stopping timer.");
        console.log(`!!!!Stop function array TIMER${this.currentPlayers}`);
        clearTimeout(this.timer);
    }


}

    // Array of GameLobby objects that get filtered in the 'lookingForGame' command for a specific lobby.
    let gameLobbies = [];

    const numberOfGames = Object.keys(allGames).length;

    for (let i = 0; i < numberOfGames; i++) {

        let gameIdentifier = this[`${allGames[Object.keys(allGames)[i]].name}`];
        
        // Creates a game lobby object for each game.
        gameIdentifier = new GameLobby({game: allGames[Object.keys(allGames)[i]].name, maxPlayers: allGames[Object.keys(allGames)[i]].maxPlayers});

        gameLobbies.push(gameIdentifier);
        
     }

module.exports.gameLobbies = gameLobbies;