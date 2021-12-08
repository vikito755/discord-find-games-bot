const { GamesWrapper } = require('../objects/GamesWrapper');
const { GameLobby } = require('../objects/GameLobby');
const { allGames } = require('../games.json');

// const { createGameOption } = require('../utilities/createGameOption');

const gameLobbies = [];
const gameOptions = [];
let listOfAllGames = 'All games: \n';

// Filling the gameLobbies and gameOptions with one loop.
allGames.map(game => {
	// The gameName is "const", because it stays the same for the entire cycle.
	const gameName = game.name;
	let gameIdentifier = this[`${gameName}`];

	// Creates a game lobby object for each game.
	gameIdentifier = new GameLobby({ game: gameName, maxPlayers: game.maxPlayers });

	gameLobbies.push(gameIdentifier);

	gameOptions.push(gameName);

	listOfAllGames += `${gameName} \n`;
});

const GameStorage = new GamesWrapper({ gameOptions: gameOptions, lobbies: gameLobbies, listGames: listOfAllGames });

module.exports.GameStorage = GameStorage;