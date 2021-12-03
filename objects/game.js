// The purpose of this class is to have one format for adding games

class Game {
	constructor(params) {
		this.game = params.game;
		this.maxPlayers = params.maxPlayers;
	}

}

export default {
	Game,
};