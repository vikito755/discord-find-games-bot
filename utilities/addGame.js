const { GameStorage } = require('../initialisation/GameStorage');
const { GameLobby } = require('../objects/GameLobby');
const { createGameOption } = require('../utilities/createGameOption');

const addGame = (gameName, maxPlayers) => {

	GameStorage.gameOptions.push(createGameOption(gameName));
	GameStorage.lobbies.push(new GameLobby({ game: gameName, maxPlayers: maxPlayers }));

};

module.exports.addGame = addGame;
