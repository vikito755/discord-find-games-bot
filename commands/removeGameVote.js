const { SlashCommandBuilder } = require('@discordjs/builders');
const { GameStorage } = require('../initialisation/GameStorage');
const { normalisesOptionInput } = require('../utilities/normalisesOptionInput');
const { positiveVoteEmoji, negativeVoteEmoji, percentageOfreactionsNeeded, timeForVoting } = require('../constants.json');
const reactionEmojis = [ positiveVoteEmoji, negativeVoteEmoji];

// Displays all available games. In the future categories may be added.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove_vote_game')
		.setDescription('Suggest a game to be added.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The full name of the game you propose to be added.')
				.setAutocomplete(true)
				.setRequired(true),
		),
	async execute(interaction) {

		const proposedGame = normalisesOptionInput(interaction.options._hoistedOptions[0].value);
		const proposal = await interaction.reply({ content: `${interaction.user} proposes the __**removal**__ of **~~${proposedGame}~~** from the game list.`, fetchReply: true });
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
					GameStorage.removeGame(proposedGame);
					interaction.channel.send(`__**${proposedGame}**__ was __**removed**__ by community voting with ${positiveReactionsCount} votes.`);
				}
				else if (positiveReactionsCount < negativeReactionsCount) {
					interaction.channel.send(`__**${proposedGame}**__ was __**kept**__ in the list by community voting with ${negativeReactionsCount} votes.`);
				}
				else if (positiveReactionsCount === negativeReactionsCount) {
					interaction.channel.send(`The vote for __**${proposedGame}**__ was tied the game was kept.`);
				}
			})
			.catch(() => {
				interaction.channel.send(`The time to vote on __**${proposedGame}**__ ran out, the vote is void.`);
			});
	},
};
