const { SlashCommandBuilder } = require('@discordjs/builders');
const { gameOptions } = require('../responses/gameChoices')
const { lookingForGameCommand } = require('../constants.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName(lookingForGameCommand)
		.setDescription('Signal that you are looking to play.')
        .addStringOption( option =>
        option.setName("game")
            .setDescription("Start typing the game you are looking to play and send it.")
            .setRequired(true)
            .addChoices(gameOptions)
            ),
	async execute(interaction) {
        const selectedGame = interaction.options._hoistedOptions[0].value;
		await interaction.reply( {content: `${interaction.user} is looking to play ${selectedGame}`});
    },
};
