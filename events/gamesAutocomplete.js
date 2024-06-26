const { GameStorage } = require('../initialisation/GameStorage');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isAutocomplete()) return;
		const focusedValue = interaction.options.getFocused();

		const choices = GameStorage.gameOptions;

		const filtered = choices.filter(choice => choice.startsWith(focusedValue));

		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
};
