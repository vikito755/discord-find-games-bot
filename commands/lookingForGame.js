const { SlashCommandBuilder } = require('@discordjs/builders');
const { lookingForGameCommand, millisecondsBeforeLobbyReset } = require('../constants.json');
const { GameStorage } = require('../initialisation/GameStorage');

const minutesBeforeLobbyReset = parseInt(millisecondsBeforeLobbyReset / 60000);

// Allows users to queue up for predefined games
module.exports = {
	data: new SlashCommandBuilder()
		.setName(lookingForGameCommand)
		.setDescription(`Get notified when someone else is looking to play. Lobbies restart every ${minutesBeforeLobbyReset} minutes.`)
		.addStringOption(option =>
			option.setName('game')
				.setDescription('Start typing the game you are looking to play and send it.')
				.setRequired(true)
				// .addChoices(GameStorage.gameOptions)
				.setAutocomplete(true),
		),
	async execute(interaction) {

		// console.log(interaction.options._hoistedOptions[0]);

		const selectedGame = interaction.options._hoistedOptions[0].value;

		const selectedLobby = GameStorage.lobbies.find(lobby => {
			return lobby['game'] === selectedGame;
		});

		const numberOfQueuedPlayers = selectedLobby['currentPlayers'].length;
		const currentUserId = interaction.user.id;
		const palyersBeforeLobbyReset = selectedLobby['maxPlayers'] - 1;

		const userNotInQueue = !selectedLobby['currentPlayers'].includes(`<@${currentUserId}>`);

		if (userNotInQueue) {

			if (numberOfQueuedPlayers === 0) {
				selectedLobby.startTimer();
				selectedLobby.addPlayer(currentUserId);
				await interaction.reply({ content: `Current party for __**${selectedGame}**__ - ${selectedLobby['currentPlayers'].join(', ')}.` });
			}

			else if (numberOfQueuedPlayers <= palyersBeforeLobbyReset) {
				selectedLobby.addPlayer(currentUserId);
				await interaction.reply({ content: `Current party for __**${selectedGame}**__ - ${selectedLobby['currentPlayers'].join(', ')}.` });
			}
			else {
				selectedLobby.reset();
				selectedLobby.stopTimer();
				selectedLobby.addPlayer(currentUserId);
				await interaction.reply(`Resetting the __**${selectedGame}**__ lobby and adding <@${currentUserId}> to a new one.`);
			}
		}
		else {
			await interaction.reply({ content: `You are already in queue for __**${selectedGame}**__ and will be tagged when other people join. Each lobby lasts for ${minutesBeforeLobbyReset} minutes (From the moment they are started).`,
				ephemeral: true });
		}
	},
};
