const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { lookingForGameCommand } = require('./constants.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Loading up the events on which commands will execute
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Loading up the commands from the "commands directory."
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Message to let us know the bot loads up.
client.once('ready', () => {
	console.log('Ready!');
});


// Dynamic execution of commands, checking if a message is command and if it has an error sends a generic error message.
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		console.log(`Command name: ${ command.data.name === lookingForGameCommand}`);

		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login the bot to Discord, the token is very sensitive data, make sure the "config.json" file is secure.
// If the credentials are compromised immediately reset them from the Discord developer portal and re-enter them in the "config.json" file.
client.login(token);