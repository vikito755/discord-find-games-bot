const { SlashCommandBuilder } = require('@discordjs/builders');
const { gameOptions } = require('../responses/gameChoices')
const { lookingForGameCommand } = require('../constants.json')
const { Client, Collection, Intents } = require('discord.js');
const { GameLobbies } = require ('../objects/GameLobbies');

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

        // console.log(`Gmae lobbies: ${Object.keys(GameLobbies)}`);
        // game,amountOfPlayers,currentPlayers
        // console.log(`Game name: ${GameLobbies['game']}`);
        // console.log(`Game PLAYERSMAX: ${GameLobbies['amountOfPlayers']}`);
        // console.log(`Game currentPlayers: ${GameLobbies['currentPlayers']}`);
        // console.log(`Game: ${Object.keys(GameLobbies)}`);
        // console.log(`Game: ${Object.keys(GameLobbies)}`);

        const selectedLobby = GameLobbies.filter( lobby => {
            
            return lobby["game"] === selectedGame;
        })

        // GameLobbies.map( game => {
        //     console.log(" ");
        //     console.log(game);
        // })

        // console.log(Object.keys(GameLobbies[0]));

        console.log(selectedLobby[0]['amountOfPlayers']);
        console.log(selectedLobby[0]['currentPlayers']);
        selectedLobby[0].addPlayer();
        console.log(selectedLobby[0]['currentPlayers']);

        // console.log(`Game: ${currentGame}`);
        // game,amountOfPlayers,currentPlayers

        // console.log(`The object for selected game: ${GameLobbies}`);

        // console.log(`Object for selected games: ${Object.keys(GameLobbies[0])}`);
        // const lobby = new GameLobby({game: "Lorem John", amountOfPlayers: 3});

        // lobby.introduce();
        // console.log(" ");
        // console.log(" ");
        
        // console.log(lobby.age());
		await interaction.reply( {content: `${interaction.user} discord is looking to play ${selectedGame}`});
        console.log(`Registered: ${selectedGame}`);
    },
};
