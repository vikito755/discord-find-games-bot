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
				console.log(`Error while adding the game: ${err}`);
			}

			const persistentlyStoredGames = JSON.parse(data);

			const gameIsAlreadyAdded = persistentlyStoredGames.allGames.some(game => game.name === gameName);
			if (gameIsAlreadyAdded) {
				console.log('Game is already in the list.');
				return;
			}

			else {

				persistentlyStoredGames.allGames.push(new Game({ name: gameName, maxPlayers: maxPlayers }));


				const writingData = JSON.stringify(persistentlyStoredGames);

				fs.writeFile('./games.json', writingData, 'utf-8', (err) => {
					if (err) {
						console.log(`Error adding game: ${err}`);
					}
					else {
						console.log('Game added successfully!');
					}

				});

				this.gameOptions.push(gameName);
				this.lobbies.push(new GameLobby({ game: gameName, maxPlayers: maxPlayers }));
			}
		});


	}

	removeGame(gameName) {


		fs.readFile('./games.json', 'utf-8', (err, data) => {
			if (err) {
				console.log(`Error while removing a game: ${err}`);
			}

			// Removes the autocomplete option.
			this.gameOptions = this.gameOptions.filter(option => {
				return !(option === gameName);
			});

			// Removes the lobby for the LFG command.
			this.lobbies = this.lobbies.filter(lobby => {
				return !(lobby.game === gameName);
			});

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
					console.log(`Error while removing a game: ${err}`);
				}
				else {
					console.log('Game removed successfully!');
				}

			});

		});

		console.log(`Game added ${gameName}`);
	}

}

module.exports.GamesWrapper = GamesWrapper;