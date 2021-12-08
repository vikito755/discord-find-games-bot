const { GameStorage } = require('../initialisation/GameStorage');
const { lookingForGameCommand } = require('../constants.json');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isAutocomplete()) return;

		if (interaction.commandName === lookingForGameCommand) {
			const focusedValue = interaction.options.getFocused();

			const choices = GameStorage.gameOptions;

			const filtered = choices.filter(choice => choice.startsWith(focusedValue));

			const response = await interaction.respond(
				filtered.map(choice => ({ name: choice, value: choice })),
			);
			console.log(response);
		}


		// console.log(interaction);

		// const selectedGame = interaction.options._hoistedOptions[0].value;

		// const selectedLobby = GameStorage.lobbies.find(lobby => {
		// 	return lobby['game'] === selectedGame;
		// });

		// const numberOfQueuedPlayers = selectedLobby['currentPlayers'].length;
		// const currentUserId = interaction.user.id;
		// const palyersBeforeLobbyReset = selectedLobby['maxPlayers'] - 1;

		// const userNotInQueue = !selectedLobby['currentPlayers'].includes(`<@${currentUserId}>`);

		// if (userNotInQueue) {

		// 	if (numberOfQueuedPlayers === 0) {
		// 		selectedLobby.startTimer();
		// 		selectedLobby.addPlayer(currentUserId);
		// 		await interaction.reply({ content: `Current party for __**${selectedGame}**__ - ${selectedLobby['currentPlayers'].join(', ')}.` });
		// 	}

		// 	else if (numberOfQueuedPlayers <= palyersBeforeLobbyReset) {
		// 		selectedLobby.addPlayer(currentUserId);
		// 		await interaction.reply({ content: `Current party for __**${selectedGame}**__ - ${selectedLobby['currentPlayers'].join(', ')}.` });
		// 	}
		// 	else {
		// 		selectedLobby.reset();
		// 		selectedLobby.stopTimer();
		// 		selectedLobby.addPlayer(currentUserId);
		// 		await interaction.reply(`Resetting the __**${selectedGame}**__ lobby and adding <@${currentUserId}> to a new one.`);
		// 	}
		// }
		// else {
		// 	await interaction.reply({ content: `You are already in queue for __**${selectedGame}**__ and will be tagged when other people join. Each lobby lasts for ${minutesBeforeLobbyReset} minutes (From the moment they are started).`,
		// 		ephemeral: true });
		// }
	},
};
