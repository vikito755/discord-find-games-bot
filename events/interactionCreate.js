const { Client, Intents, getRole, getMember, Message } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		// Log the games and interactions to form statistics about who plays what. Add interaction tracker for the event when people are looking for a game.

		if (!interaction) return;
		console.log(interaction);
		console.log(interaction.user);
		console.log(interaction.user)
		
	},



};