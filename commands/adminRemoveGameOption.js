const { SlashCommandBuilder } = require('@discordjs/builders');
const { botManagerRoleId } = require('../constants.json');

// Allows admin to remove a game option.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_game')
		.setDescription('Remove a game from the list of games.'),
	async execute(interaction) {
		const userHasRole = interaction.member._roles.includes(botManagerRoleId);
		if (userHasRole) {
			await interaction.reply('Game removed by a user with a specific role.');
		}
		else {
			await interaction.reply({ content: 'Sorry, you don\'t have the role to remove games.', ephemeral: true });
		}
	},
};
