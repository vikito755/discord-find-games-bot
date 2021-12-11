const { SlashCommandBuilder } = require('@discordjs/builders');
// const { Interaction } = require('discord.js');
// const { GameStorage } = require('../initialisation/GameStorage');
// const { maximumReplyCharacters } = require('../constants.json');
const { normalisesOptionInput } = require('../utilities/normalisesOptionInput');

let positiveVotes = 0;

// Displays all available games. In the future categories may be added.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('propose_a_game')
		.setDescription('Suggest a game to be added.')
		.addStringOption(option =>
			option
				.setName('name')
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
		proposal = await interaction.reply({content: `${interaction.user} proposes __**the addition of ${proposedGame}**__ with maximum number of players - __**${numberOfPlayers}**__`, fetchReply: true});
		proposal.react('✅');
		proposal.react('❌');

		

		const filter = (reaction, user) => {
			return reaction.emoji.name === '✅';
		};
		
		const collector = proposal.createReactionCollector({ filter, time: 15000 });
		
		collector.on('collect', (reaction, user) => {
			positiveVotes++;
			console.log(positiveVotes);
			// console.log(reaction);
		});

		collector.on('dispose', (reaction, user) => {
			positiveVotes--;
			console.log(positiveVotes);
			// console.log(reaction);
		});





	},
};
