module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		// Log the games and interactions to form statistics about who plays what. Add interaction tracker for the event when people are looking for a game.
		
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};