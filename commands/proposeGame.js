const { SlashCommandBuilder } = require('@discordjs/builders');
// const { Interaction } = require('discord.js');
// const { GameStorage } = require('../initialisation/GameStorage');
// const { maximumReplyCharacters } = require('../constants.json');
const { normalisesOptionInput } = require('../utilities/normalisesOptionInput');

// Displays all available games. In the future categories may be added.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('propose_a_game')
		.setDescription('Suggest a game to be added.')
		.addStringOption(option =>
			option
				.setName('game')
				.setDescription('Start typing the game you are looking to play and send it.')
				.setRequired(true),
		)
		.addIntegerOption(option =>
			option.setName('max_players')
				.setDescription('The number of people that can play the game\'s most popular game mode.')
				.setRequired(true),
		),
	async execute(interaction) {

		const proposedGame = normalisesOptionInput(interaction.options._hoistedOptions[0].value);
		const numberOfPlayers = normalisesOptionInput(interaction.options._hoistedOptions[1].value);
		await interaction.reply(`${interaction.user} proposes __**the addition of ${proposedGame}**__ with maximum number of players - __**${numberOfPlayers}**__`);

	},
};
