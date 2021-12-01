const { SlashCommandBuilder } = require('@discordjs/builders');
const { gameOptions } = require('../responses/gameChoices')
const { lookingForGameCommand } = require('../constants.json')
const { gameLobbies } = require ('../objects/gameLobbies');

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
        
        const selectedLobby = gameLobbies.find( lobby => {            
            return lobby["game"] === selectedGame;
        })

        const numberOfQueuedPlayers = selectedLobby['currentPlayers'].length;
        const currentUserId = interaction.user.id;
        const palyersBeforeLobbyReset = selectedLobby['maxPlayers'] -1;

        const userNotInQueue = !selectedLobby['currentPlayers'].includes(`<@${currentUserId}>`)

        if ( userNotInQueue ) {
            
            
            if (numberOfQueuedPlayers === 0) {
                selectedLobby.startTimer();
                selectedLobby.addPlayer(currentUserId);
                await interaction.reply( {content: `Current party for __**${selectedGame}**__ - ${selectedLobby['currentPlayers'].join(', ')}.`});
            }

            else if (numberOfQueuedPlayers <= palyersBeforeLobbyReset) {
                selectedLobby.addPlayer(currentUserId);
                await interaction.reply( {content: `Current party for __**${selectedGame}**__ - ${selectedLobby['currentPlayers'].join(', ')}.`});
            } 
            else {
                console.log("Empty the the queue here.");
                selectedLobby.reset();
                selectedLobby.stopTimer()
                selectedLobby.addPlayer(currentUserId);
                await interaction.reply(`Resetting the __**${selectedGame}**__ lobby and adding <@${currentUserId}> to a new one.`);                
            } 
           
            console.log(`IDENTIFIABLE USERS: ${selectedLobby['currentPlayers'].join(' ')}`);
            console.log(`USER ALREADY IN QUEUE for ${selectedGame}`);
        } 

        else {
            await interaction.reply( {content: `You are already in queue for __**${selectedGame}**__ and will be tagged when other people join.`,
             ephemeral: true});
            
        }
        console.log(`Lobby for: ${selectedGame}`);
    },
};
