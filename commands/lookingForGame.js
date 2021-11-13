const { SlashCommandBuilder } = require('@discordjs/builders');
// const { normaliseCommandName } = require('../utilities/names') 
// const { allGames } = require('../games.json')
const { gameOptions } = require('../responses/gameChoices')

const commandPrefix = "lf_"
// const gameName = normaliseCommandName("CS: GOsad :?.,!@#$$%^&*() 2132 ds dsf34 4 dfg gd f4 5 yt 546 45623324 :?.,!@#$$%^&*()");

// allGames.map( game => {
    // console.log(game);
    // console.log(`commend name: ${commandPrefix}${normaliseCommandName(game)}`);
    // console.log(`Tell people that you are lookig to play ${game}`);
    // console.log(`\n`);
    

    // console.log(...allGames)

//     new SlashCommandBuilder()
//     .setName(`${commandPrefix}${gameName}`)
//     .setDescription('Signal that you are looking to play CS: GO'),
// async execute(interaction) {
//     await interaction.reply( {content: `${interaction.user} is looking to play CS: GO`});
    
    // gameCommands.push(pingCommand)

    // console.log({...gameCommands})
// })

// let gameOptions = eval('');
    
// allGames.map( game => {
//     gameOptions += (`.addChoice(${game}, ${game})`);
// })

// console.log(gameOptions);


module.exports = {
	data: new SlashCommandBuilder()
		.setName(`${commandPrefix}`)
		.setDescription('Signal that you are looking to play CS: GO')
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
