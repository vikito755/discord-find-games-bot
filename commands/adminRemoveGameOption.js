const { SlashCommandBuilder } = require('@discordjs/builders');

// Allows admin to remove a game option.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_game')
		.setDescription('Remove a game from the list of games.'),
	async execute(interaction) {
		await interaction.reply('Game removed.');
	},
};
