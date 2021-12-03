const { SlashCommandBuilder } = require('@discordjs/builders');
const { botManagerRoleId } = require('../constants.json');

// Allows admin to add a game option.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_game')
		.setDescription('Add a game to the list of games.')
		.addStringOption(option =>
			option.setName('game')
				.setDescription('The __**full**__ name of the game you wish to add.')
				.setRequired(true)),
	async execute(interaction) {
		const userHasRole = interaction.member._roles.includes(botManagerRoleId);
		if (userHasRole) {
			await interaction.reply('Game added by a user with a protected role.');
		}
		else {
			await interaction.reply({ content: 'Sorry, you don\'t have the role to add games.', ephemeral: true });
		}
	},
};
