const { millisecondsBeforeLobbyReset } = require('../constants.json');

class GameLobby {
	constructor(params) {
		this.game = params.game;
		this.maxPlayers = params.maxPlayers;
		this.currentPlayers = [];
		this.timer;
	}

	// Adds the user tag (based on id), to an array for later use.
	addPlayer(playerID) {
		this.currentPlayers.push(`<@${playerID}>`);
	}

	//   Empties the lobby.
	reset() {
		this.currentPlayers = [];
	}


	// This function starts the timer, ends and clears the array if it if it is stale and clears the array of players.
	startTimer() {
		this.timer = setTimeout(() => {
			this.reset();
			clearTimeout(this.timer);
			// Currently set to 30 minutes from 'constants.json'.
		}, millisecondsBeforeLobbyReset);
	}

	// This function manually stops the timer. For the case when the lobby is filled up.
	stopTimer() {
		clearTimeout(this.timer);
	}

}

module.exports.GameLobby = GameLobby;