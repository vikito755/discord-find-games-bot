const { secondsBeforeLobbyReset, maximumPlayers, lookingForGameCommand } = require('../constants.json')

let usersWantingToPlayIDs = [];
let timer;

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const gameIsCSGO = !(interaction.commandName === lookingForGameCommand && interaction.options._hoistedOptions[0].value==="CS: GO");

		if (gameIsCSGO) {
			return
		}
		const userIsNotSigneUp = !(usersWantingToPlayIDs.includes(interaction.user.id));
		const noUsersInTheLobby = usersWantingToPlayIDs.length === 0;
		const maxUsers = usersWantingToPlayIDs.length === maximumPlayers;
		const selectedGame = interaction.options._hoistedOptions[0].value;
		const clearUsers = () => {
			usersWantingToPlayIDs = [];
			console.log(usersWantingToPlayIDs)
		}		

		console.log("\n");
		interaction.reply( {content: `${interaction.user} discord is looking to play ${selectedGame}`});

		if (userIsNotSigneUp) {
			console.log('User has already signed up.');
			usersWantingToPlayIDs.push(interaction.user.id);
		} else {
			interaction.user.send( `Hey friend, you have already signed up to play ${selectedGame}.`);
		}

		if (noUsersInTheLobby) {
			timer = setTimeout(clearUsers, secondsBeforeLobbyReset);
		}

		if (maxUsers) {
			clearTimeout(timer);
			clearUsers();
			interaction.channel.send(`The lobby for ${selectedGame} has been filled up. Starting a new one.`)
		}

		console.log(usersWantingToPlayIDs);
	
	},
};
