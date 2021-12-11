const { SlashCommandBuilder } = require('@discordjs/builders');
const { GameStorage } = require('../initialisation/GameStorage');
const { normalisesOptionInput } = require('../utilities/normalisesOptionInput');
const { positiveVoteEmoji, negativeVoteEmoji, percentageOfreactionsNeeded, votingTime } = require('../constants.json')
let reactionEmojis = [ positiveVoteEmoji, negativeVoteEmoji];

// Displays all available games. In the future categories may be added.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('propose_addition')
		.setDescription('Suggest a game to be added.')
		.addStringOption(option =>
			option
				.setName('game')
				.setDescription('The full name of the game you propose to be added.')
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
		proposal.react(positiveVoteEmoji);
		proposal.react(negativeVoteEmoji);


		const votesNeeded =  Math.ceil((percentageOfreactionsNeeded/100) * proposal.guild.memberCount);

		const filter = (reaction) => {
			return reactionEmojis.includes(reaction.emoji.name);
		};
		
		const votesCollector = proposal.createReactionCollector({ filter, time: votingTime });
		votesCollector.on('collect', (reaction) => {
			if (reaction.count >= votesNeeded) {
				votesCollector.stop();
			}
		});

		votesCollector.on('end', () => {
			const positiveReactionsCount = votesCollector.collected.get(positiveVoteEmoji).count;
			const negativeReactionsCount = votesCollector.collected.get(negativeVoteEmoji).count;

			if ( positiveReactionsCount >= votesNeeded ) {
				GameStorage.addGame(proposedGame, numberOfPlayers);
				proposal.edit(`__**${proposedGame}**__ was __**approved**__ by the community with ${positiveReactionsCount} votes.`);
			} else if (negativeReactionsCount >= votesNeeded) {
				proposal.edit(`__**${proposedGame}**__ was __**declined**__ by the community with ${negativeReactionsCount} votes.`);
			} else {
				proposal.edit(`The time to vote on __**${proposedGame}**__ expired. With ${positiveReactionsCount} positive votes and ${negativeReactionsCount} negative votes.`);
			}
		});
	},
};
