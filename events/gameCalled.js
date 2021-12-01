const { secondsBeforeLobbyReset, maximumPlayers, lookingForGameCommand } = require('../constants.json')

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		// Collect each time a game is invoked and store it along with a date in a database.
		// Each column is a separate game.

		console.log("INTERACTION REGISTERED");
	
	},
};
