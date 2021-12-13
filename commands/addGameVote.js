const { SlashCommandBuilder } = require('@discordjs/builders');
const { GameStorage } = require('../initialisation/GameStorage');
const { normalisesOptionInput } = require('../utilities/normalisesOptionInput');
const { positiveVoteEmoji, negativeVoteEmoji, percentageOfreactionsNeeded, timeForVoting } = require('../constants.json');
const reactionEmojis = [ positiveVoteEmoji, negativeVoteEmoji];

// Displays all available games. In the future categories may be added.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_vote_game')
		.setDescription('Suggest a game to be added.')
		.addStringOption(option =>
			option
				.setName('name')
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
		const proposal = await interaction.reply({ content: `${interaction.user} proposes __**the addition of ${proposedGame}**__ with maximum number of players - __**${numberOfPlayers}**__`, fetchReply: true });
		proposal.react(positiveVoteEmoji);
		proposal.react(negativeVoteEmoji);

		// Max votes calculated by a percentage of the current member count in the server times 2 (for both options).
		const maxVotes = (Math.ceil((percentageOfreactionsNeeded / 100) * proposal.guild.memberCount)) * 2;

		const filter = reaction => {
			return reactionEmojis.includes(reaction.emoji.name);
		};

		proposal.awaitReactions({ filter, max: maxVotes, time: timeForVoting, errors: ['time'] })
			.then(reactions => {
				const positiveReactionsCount = reactions.get(positiveVoteEmoji).count;
				const negativeReactionsCount = reactions.get(negativeVoteEmoji).count;

				if (positiveReactionsCount > negativeReactionsCount) {
					GameStorage.addGame(proposedGame, numberOfPlayers);
					interaction.channel.send(`__**${proposedGame}**__ was __**added**__ by community voting with ${positiveReactionsCount} votes.`);
				}
				else if (positiveReactionsCount < negativeReactionsCount) {
					interaction.channel.send(`__**${proposedGame}**__ was __**declined**__ by community voting with ${negativeReactionsCount} votes.`);
				}
				else if (positiveReactionsCount === negativeReactionsCount) {
					interaction.channel.send(`__**${proposedGame}**__ is tied the game was not added.`);
				}
			})
			.catch(() => {
				interaction.channel.send(`The time to vote on __**${proposedGame}**__ ran out, the vote is void.`);
			});
	},
};
