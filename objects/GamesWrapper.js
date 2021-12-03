/* The purpose of this wrapper is to have the GameLobbies (array of objects) and GameOptions (the options for the game array)
 as its properties so more games can be added and removed without resetting the bot. */
class GamesWrapper {

	constructor(params) {
		/* Array of game gameOptions, each option is an array in the following format
        [[game1.name, game1.name], [game2.name, game2.name], , [gameN.name, gameN.name] ] (2 dimensional array) */
		this.gameOptions = params.gameOptions;

		// Array of GameLobby objects. Previously called "gameLobbies"
		this.lobbies = params.lobbies;
	}

}

module.exports.GamesWrapper = GamesWrapper;