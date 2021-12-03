import { GameStorage } from '../initialisation/GameStorage';
import { GameLobby } from '../objects/GameLobby';
import { createGameOption } from './createGameOption';

const addGame = (gameName, maxPlayers) => {
	GameStorage.gameOptions.push(createGameOption(gameName));
	GameStorage.lobbies.push(new GameLobby({ game: gameName, maxPlayers: maxPlayers }));
};

export default {
	addGame,
};