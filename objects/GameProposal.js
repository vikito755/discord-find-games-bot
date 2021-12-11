class GameProposal {
	constructor(params) {
		this.gameName = params.gameName;
		this.maxPlayers = params.maxPlayers;
		this.queueIndex = params.queueIndex;
	}

}

module.exports.GameProposal = GameProposal;