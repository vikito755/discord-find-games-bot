// const { createGameOption } = require('../utilities/createGameOption');
const { GameLobby } = require('./GameLobby');
/* The purpose of this wrapper is to have the GameLobbies (array of objects) and GameOptions (the options for the game array)
 as its properties so more games can be added and removed without resetting the bot. */

class GamesWrapper {
// Updating GameWrapper with a method to update its game options.
	constructor(params) {
		/* Array of game gameOptions, each option is an array in the following format
        [[game1.name, game1.name], [game2.name, game2.name], , [gameN.name, gameN.name] ] (2 dimensional array) */
		this.gameOptions = params.gameOptions;

		// Array of GameLobby objects. Previously called "gameLobbies"
		this.lobbies = params.lobbies;

		this.listGames = params.listGames;
	}

	addGame(gameName, maxPlayers) {

		this.gameOptions.push(gameName);
		this.lobbies.push(new GameLobby({ game: gameName, maxPlayers: maxPlayers }));

	}

}

module.exports.GamesWrapper = GamesWrapper;