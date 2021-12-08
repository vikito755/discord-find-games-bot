const { SlashCommandBuilder } = require('@discordjs/builders');
const { botManagerRoleId } = require('../constants.json');
const { GameStorage } = require('../initialisation/GameStorage');

// Allows admin to remove a game option.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_game')
		.setDescription('Remove a game from the list of games.')
		.addStringOption(option =>
			option.setName('game')
				.setDescription('Game to be removed.')
				.setRequired(true)
				.setAutocomplete(true),
		),
	async execute(interaction) {
		const userHasRole = interaction.member._roles.includes(botManagerRoleId);
		if (userHasRole) {
			const selectedGame = interaction.options._hoistedOptions[0].value;

			GameStorage.removeGame(selectedGame);
			await interaction.reply('Game removed by a user with a specific role.');

		}
		else {
			await interaction.reply({ content: 'Sorry, you don\'t have the role to remove games.', ephemeral: true });
		}
	},
};
