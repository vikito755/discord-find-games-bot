const { GamesWrapper } = require('../objects/GamesWrapper');
const { GameLobby } = require('../objects/GameLobby');
const { allGames } = require('../games.json');

const gameLobbies = [];
const gameOptions = [];

// Filling the gameLobbies and gameOptions with one loop.
allGames.map(game => {
	// The gameName is "const", because it stays the same for the entire cycle.
	const gameName = game.name;
	let gameIdentifier = this[`${gameName}`];

	// Creates a game lobby object for each game.
	gameIdentifier = new GameLobby({ game: gameName, maxPlayers: game.maxPlayers });

	gameLobbies.push(gameIdentifier);

	gameOptions.push([gameName, gameName]);

});

const GameStorage = new GamesWrapper({ gameOptions: gameOptions, lobbies: gameLobbies });

module.exports.GameStorage = GameStorage;