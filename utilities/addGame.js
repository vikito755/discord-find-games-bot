const { GameStorage } = require('../initialisation/GameStorage');
const { GameLobby } = require('../objects/GameLobby');
const { createGameOption } = require('../utilities/createGameOption');

const addGame = (gameName, maxPlayers) => {

	GameStorage.gameOptions.push(createGameOption(gameName));
	GameStorage.lobbies.push(new GameLobby({ game: gameName, maxPlayers: maxPlayers }));

	// const commands = [];
	// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	// for (const file of commandFiles) {
	// 	const command = require(`./commands/${file}`);
	// 	commands.push(command.data.toJSON());
	// }
	// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })

};

module.exports.addGame = addGame;
