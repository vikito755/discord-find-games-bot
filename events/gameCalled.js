// // const { Client, Intents, getRole, getMember, Message } = require('discord.js');
// // const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
// const { MessageCollector } = require('discord.js');
const { MessageCollector } = require('discord.js');
const { secondsBeforeLobbyReset, maximumPlayers, lookingForGameCommand } = require('../constants.json')



let usersWantingToPlayIDs = [];


const clearUsers = () => {
	usersWantingToPlayIDs = [];
	console.log(usersWantingToPlayIDs)
	console.log("Array emptied");
}


// let seconds = secondsBeforeLobbyReset * 1000;

let seconds = secondsBeforeLobbyReset * 100000;
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		// if ( !(interaction.isCommand() && interaction.commandName === lookingForGameCommand && interaction.options._hoistedOptions[0].value==="CS: GO")) {
		// 	return
		// }
		const userIsNotSigneUp = !(usersWantingToPlayIDs.includes(interaction.user.id));
		const noUsersInTheLobby = usersWantingToPlayIDs.length === 0;
		const maxUsers = usersWantingToPlayIDs.length === maximumPlayers;



		console.log("\n");
	
		if (noUsersInTheLobby) {
			setTimeout(clearUsers, seconds);
		}
		
		if (userIsNotSigneUp) {
			console.log('User has already signed up.');
			usersWantingToPlayIDs.push(interaction.user.id)
		}

		if (maxUsers) {
			clearUsers();
		}

		
		

		
		console.log(usersWantingToPlayIDs);
		
		// if (messageCollector === undefined) {
		// 	console.log("Inside the IF");
		// 	console.log("\n");
		// 	// console.log("Message collector is undefined.");
		// 	// console.log(messageCollector);
		// 	// console.log(typeof(messageCollector));
		// 	const filter = m => m===m;
		// 	messageCollector = interaction.channel.createMessageCollector(filter, { time: 15000})
		// 	// console.log(`Message collector: ${messageCollector}`);

		// 	console.log("Collector initialised");
		// 	console.log("\n");


		// 	messageCollector.on('collect', m => console.log(`Collected ${m.content}`));
		// 	messageCollector.on('end', collected => console.log(`Collected ${collected.size} items`));
		// 	console.log("Collector ended")

		// } 

		// console.log(interaction);
		
		// console.log("Collector ALREADY running");
		// messageCollector.on('collect', m => {
		// 	console.log(`Collected ${m}`);
		// });

		// messageCollector.on('end', collected => {
		// 	console.log(`Collected ${collected.size} items`);
		// });


		

		// if (messageCollector) {
		// 	messageCollector = new MessageCollector({time: 15000});
		// }
		
		// if (!interaction.isCommand() && interaction.commandName === lookingForGameCommand) return;
		// if ( !(interaction.isCommand() && interaction.commandName === lookingForGameCommand && interaction.options._hoistedOptions[0].value==="CS: GO")) {


		// if ( !(interaction.isCommand() && interaction.commandName === lookingForGameCommand && interaction.options._hoistedOptions[0].value==="CS: GO")) {
		// 	return
			
		// } else {


		// 		// let timer = setInterval(clearUsers, secondsBeforeLobbyReset * 1000);
		// 		setTimeout(clearUsers, secondsBeforeLobbyReset * 1000);

		// 		console.log("LF command");

		// 		console.log(usersWantingToPlayIDs);
				
		// 		const selectedGame = interaction.options._hoistedOptions[0].value;
		// 		console.log(selectedGame)


		// 		usersWantingToPlayIDs.push(interaction.user.id);
		// 		console.log(usersWantingToPlayIDs)
				
				
		// 		interaction.channel.send(`<@${usersWantingToPlayIDs[0]}> ${selectedGame}`);



			
		// }
		
	},
};
