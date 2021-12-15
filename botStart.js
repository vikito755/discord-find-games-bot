const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { createDatabaseCollection } = require('./database/createDatabaseCollection');
const { dropDatabaseCollection } = require('./database/dropDatabaseCollection');

const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

discordClient.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Loading up the events on which commands will execute
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		discordClient.once(event.name, (...args) => event.execute(...args));
	}
	else {
		discordClient.on(event.name, (...args) => event.execute(...args));
	}
}

// Loading up the commands from the "commands directory."
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	discordClient.commands.set(command.data.name, command);
}

// Message to let us know the bot loads up.
discordClient.once('ready', () => {
	console.log('Ready!');
});

discordClient.on('guildCreate', async interaction => {
	const serverId = interaction.id;
	console.log(`Bot JOINED server with id: ${serverId}`);
	createDatabaseCollection(serverId);
});

discordClient.on('guildDelete', async interaction => {
	const serverId = interaction.id;
	console.log(`Bot LEFT server with id: ${serverId}`);
	dropDatabaseCollection(serverId);
});

// Dynamic execution of commands, checking if a message is command and if it has an error sends a generic error message.
discordClient.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = discordClient.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login the bot to Discord, the token is very sensitive data, make sure the "config.json" file is secure.
// If the credentials are compromised immediately reset them from the Discord developer portal and re-enter them in the "config.json" file.
discordClient.login(token);