// const { createGameOption } = require('../utilities/createGameOption');
const { Game } = require('./Game');
const { GameLobby } = require('./GameLobby');
const fs = require('fs');


/* The purpose of this wrapper is to have the GameLobbies (array of objects) and GameOptions (the options for the game array)
 as its properties so more games can be added and removed without resetting the bot. */

class GamesWrapper {
// Updating GameWrapper with a method to update its game options.
	constructor(params) {
		/* Array of game gameOptions, each option is an element of the array */
		this.gameOptions = params.gameOptions;

		// Array of GameLobby objects. Previously called "gameLobbies"
		this.lobbies = params.lobbies;

		this.listGames = params.listGames;
	}

	addGame(gameName, maxPlayers) {

		fs.readFile('./games.json', 'utf-8', (err, data) => {
			if (err) {
				console.log(`Error reading file from disk: ${err}`);
			}

			// console.log(data);
			const persistentlyStoredGames = JSON.parse(data);
			// persistentlyStoredGames.forEach(element => {
			// 	console.log(element);
			// });
			console.log(persistentlyStoredGames);
			// console.log(typeof(persistentlyStoredGames));
			persistentlyStoredGames.allGames.push(new Game({ name: gameName, maxPlayers: maxPlayers }));

			// persistentlyStoredGames.

			console.log(persistentlyStoredGames);
			const writingData = JSON.stringify(persistentlyStoredGames);

			fs.writeFile('./games.json', writingData, 'utf-8', (err) => {
				if (err) {
					console.log(`Error writing file: ${err}`);
				}
				else {
					console.log('File is written successfully!');
				}

			});

		});


		this.gameOptions.push(gameName);
		this.lobbies.push(new GameLobby({ game: gameName, maxPlayers: maxPlayers }));

	}

}

module.exports.GamesWrapper = GamesWrapper;