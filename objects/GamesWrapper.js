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
				console.log(`While adding the game: ${err}`);
			}

			const persistentlyStoredGames = JSON.parse(data);

			persistentlyStoredGames.allGames.push(new Game({ name: gameName, maxPlayers: maxPlayers }));


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

	removeGame(gameName) {

		// Removes the autocomplete option.
		this.gameOptions = this.gameOptions.filter(option => {

			return !(option === gameName);
		});


		// this.lobbies = this.lobbies.filter(lobby => {
		// 	return !(lobby.game === gameName);
		// });


		fs.readFile('./games.json', 'utf-8', (err, data) => {
			if (err) {
				console.log(`While removing the game: ${err}`);
			}

			const persistentlyStoredGames = JSON.parse(data);

			persistentlyStoredGames.allGames.map(game => {
				if (game.name === gameName) {
					const gameIndex = persistentlyStoredGames.allGames.indexOf(game);
					persistentlyStoredGames.allGames.splice(gameIndex, 1);
				}
			});

			const writingData = JSON.stringify(persistentlyStoredGames);

			fs.writeFile('./games.json', writingData, 'utf-8', (err) => {
				if (err) {
					console.log(`Error writing file: ${err}`);
				}
				else {
					console.log('Game removed successfully!');
				}

			});

		});


		// All that is left is to delete the game from 'games.json', similarly to how you add a game above.

		console.log(`Game to be removed GAME WRAPPER ${gameName}`);
	}

}

module.exports.GamesWrapper = GamesWrapper;