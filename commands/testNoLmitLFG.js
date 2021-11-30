const { SlashCommandBuilder } = require('@discordjs/builders');
const { gameOptions } = require('../responses/gameChoices')
const { lookingForGameCommand } = require('../constants.json')
const { Client, Collection, Intents } = require('discord.js');
const { gameLobbies } = require ('../objects/gameLobbies');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName("testlfg")
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

        // console.log(`Gmae lobbies: ${Object.keys(gameLobbies)}`);
        // game,amountOfPlayers,currentPlayers
        // console.log(`Game name: ${gameLobbies['game']}`);
        // console.log(`Game PLAYERSMAX: ${gameLobbies['amountOfPlayers']}`);
        // console.log(`Game currentPlayers: ${gameLobbies['currentPlayers']}`);
        // console.log(`Game: ${Object.keys(gameLobbies)}`);
        // console.log(`Game: ${Object.keys(gameLobbies)}`);

        const selectedLobby = gameLobbies.find( lobby => {            
            return lobby["game"] === selectedGame;
        })

        const numberOfQueuedPlayers = selectedLobby['currentPlayers'].length;
        const currentUserId = interaction.user.id;
        const palyersBeforeLobbyReset = selectedLobby['maxPlayers'] -1;

        const userNotInQueue = !selectedLobby['currentPlayers'].includes(currentUserId)

        if ( userNotInQueue ) {
            
            
            if (numberOfQueuedPlayers <= palyersBeforeLobbyReset) {
                selectedLobby.addPlayer(currentUserId);
                await interaction.reply( {content: `Current party for ${selectedGame} - ${selectedLobby['currentPlayers'].join(', ')}.`});
            } 
            // else if ( numberOfQueuedPlayers === selectedLobby['maxPlayers'] ){
            else {
                console.log("Empty the the queue here.");
                selectedLobby.reset();
                selectedLobby.addPlayer(currentUserId);
                await interaction.reply(`Resetting the ${selectedGame} lobby and adding <@${currentUserId}> to it.`);                
            } 
           
            
            // console.log(selectedLobby['maxPlayers']);
            // console.log(selectedLobby['currentPlayers']);
            console.log(`IDENTIFIABLE USERS: ${selectedLobby['currentPlayers'].join(' ')}`);
            console.log(`USER ALREADY IN QUEUE for ${selectedGame}`);
        } 

        else {
            await interaction.reply( {content: `You are already in queue for __**${selectedGame} and will be tagged when other people are looking too.`,
             ephemeral: true});
            
        }

        userNotInQueue
            

        
            

        // Checks the current object
        // console.log(selectedLobby['maxPlayers']);
        // console.log(selectedLobby['currentPlayers']);
        // console.log(interaction.user.id);
        // selectedLobby.addPlayer(currentUserId);
        // console.log(selectedLobby['currentPlayers']);
        // interaction.channel.send(`<@${currentUserId}>`);

        
		// await interaction.reply( {content: `${interaction.user} discord is looking to play ${selectedGame}`});
        console.log(`Registered: ${selectedGame}`);
    },
};
