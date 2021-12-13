const { SlashCommandBuilder } = require('@discordjs/builders');
const { botManagerRoleId } = require('../constants.json');
const { GameStorage } = require('../initialisation/GameStorage');
const { normalisesOptionInput } = require('../utilities/normalisesOptionInput');

// Allows admin to add a game option.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('admin_add_game')
		.setDescription('Add a game to the list of games.')
		.addStringOption(option =>
			option.setName('game')
				.setDescription('The full name of the game you wish to add.')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('max_players')
				.setDescription('The max number of players for the most popular mode of the game.')
				.setRequired(true),
		),
	async execute(interaction) {
		const userHasRole = interaction.member._roles.includes(botManagerRoleId);
		if (userHasRole) {

			const addedGameName = normalisesOptionInput(interaction.options._hoistedOptions[0].value);
			const maxPlayers = normalisesOptionInput(interaction.options._hoistedOptions[1].value);
			GameStorage.addGame(addedGameName, maxPlayers);
			await interaction.reply('Game added by a user with a protected role.');
		}
		else {
			await interaction.reply({ content: 'Sorry, you don\'t have the role to add games.', ephemeral: true });
		}
	},
};
