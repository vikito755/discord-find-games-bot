const { SlashCommandBuilder } = require('@discordjs/builders');
const { gameOptions } = require('../responses/gameChoices')
const { lookingForGameCommand } = require('../constants.json')
const { Client, Collection, Intents } = require('discord.js');
const { GameLobby } = require ('./objects/GameLobby');

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
        // console.log(newUser);

        
        const lobby = new GameLobby({game: "Lorem John", amountOfPlayers: 3});

        // lobby.introduce();
        console.log(" ");
        console.log(" ");
        
        console.log(lobby.age());
		await interaction.reply( {content: `${interaction.user} discord is looking to play ${selectedGame}`});
        console.log(`Registered: ${selectedGame}`);
    },
};