// The purpose of this class is to have one format for adding games

class Game {
	constructor(params) {
		this.name = params.name;
		this.maxPlayers = params.maxPlayers;
	}

}

module.exports.Game = Game;