const { SlashCommandBuilder } = require('@discordjs/builders');
const { gameOptions } = require('../responses/gameChoices')
const { lookingForGameCommand } = require('../constants.json')
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


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

        // Create a message collector
        // const filter = m => m.content.includes('discord');
        // const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
        // console.log("Collector registered")
        // collector.on('collect', m => console.log(`Collected ${m.content}`));
        // collector.on('end', collected => console.log(`Collected ${collected.size} items`));
		await interaction.reply( {content: `${interaction.user} discord is looking to play ${selectedGame}`});
    },
};
