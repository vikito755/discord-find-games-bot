const { SlashCommandBuilder } = require('@discordjs/builders');
const { normaliseCommandName } = require('../utilities/names') 
const { allGames } = require('../games.json')

const commandPrefix = "lf_"
// const gameName = normaliseCommandName("CS: GOsad :?.,!@#$$%^&*() 2132 ds dsf34 4 dfg gd f4 5 yt 546 45623324 :?.,!@#$$%^&*()");

allGames.map( game => {
    console.log(game);
    console.log(`commend name: ${commandPrefix}${normaliseCommandName(game)}`);
    console.log(normaliseCommandName(`Tell people that you are lookig to play ${game}`));
    console.log(`\n`);
    
})

module.exports = {

    data: new SlashCommandBuilder()
		.setName(`sample_data`)
		.setDescription('test'),
	async execute(interaction) {
		await interaction.reply( {content: `test`});
    }
	// data: new SlashCommandBuilder()
	// 	.setName(`${commandPrefix}${gameName}`)
	// 	.setDescription('Signal that you are looking to play CS: GO'),
	// async execute(interaction) {
	// 	await interaction.reply( {content: `${interaction.user} is looking to play CS: GO`});

	// },
};
