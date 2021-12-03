const { SlashCommandBuilder } = require('@discordjs/builders');
const { GameStorage } = require('../initialisation/GameStorage');

// Displays all available games. In the future categories may be added.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('all_games')
		.setDescription('Display a list of all available games you can get notified for!'),
	async execute(interaction) {
		// The argument "ephemeral" means that only the user who submitted the command can see the response.
		await interaction.reply({ content: GameStorage.listGames, ephemeral: true });
	},
};
