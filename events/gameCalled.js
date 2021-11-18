// // const { Client, Intents, getRole, getMember, Message } = require('discord.js');
// // const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
// const { MessageCollector } = require('discord.js');
const { lookingForGameCommand } = require('../constants.json')
// // let activeGames = [];

// module.exports.run = {
// 	name: 'interactionCreate',
// 	execute(interaction) {
// 		// Log the games and interactions to form statistics about who plays what. Add interaction tracker for the event when people are looking for a game.

// 		if (!interaction.isCommand() && interaction.commandName === lookingForGameCommand) return;
// 		const selectedGame = interaction.options._hoistedOptions[0].value;

// 		const filter = m => m.content.includes('discord');
		
// 		const collector = interaction.channel.createMessageComponentCollector({ time: 1500 });
		
// 		console.log(interaction);

// 		collector.on('collect', m => {
// 			console.log(`Collected ${m.content}`);
// 			collector.collect(m.content);
// 			console.log(`Collected ${m.content}`);
// 		});

// 		collector.on('end', collected => {
// 			console.log(`Collected ${collected.size} items`);
// 		});


// 			// if ( !(selectedGame in activeGames)) {
// 			// 	activeGames.push(selectedGame)
// 			// }

// 		// console.log(interaction);
// 		// console.log(interaction.user);
// 		// console.log(interaction.user)
// 		console.log("Registered an 'lf' command")
// 		console.log(`Game name from the interaction EVENT: ${selectedGame}`)
// 		// console.log(interaction)
// 		// console.log(interaction.commandName);
// 		interaction.reply
// 	},
// };














module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		// console.log(interaction);
		console.log("\n");
		// if (!interaction.isCommand() && interaction.commandName === lookingForGameCommand) return;
		if (interaction.isCommand() && interaction.commandName === lookingForGameCommand) {
			console.log("LF command");
			// console.log(interaction.commandName);
			// console.log(lookingForGameCommand);

			const filter = m => m.content.includes('looking');

			const collector = interaction.channel.crcollectoreateMessageComponentCollector(filter, { time: 150 });
			console.log("COLLECTOR registered");
			console.log(collector);
		
			// console.log(interaction);

			// collector.on('collect', m => {
			// 	console.log(`Collected ${m.content}`);
			// 	collector.collect(m.content);
			// 	console.log(`Collected ${m.content}`);
			// });

			collector.handleCollect( (message) => {
				console.log(message);
			})

			collector.on('end', collected => {
				console.log(`Collected ${collected.size} items`);
			});


			// console.log(collector);
		} else {
			console.log("NOT lf command");
			console.log(interaction.commandName);
			console.log(lookingForGameCommand);
			console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		}
		
	},
};
