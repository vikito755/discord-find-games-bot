// const { secondsBeforeLobbyReset, maximumPlayers, lookingForGameCommand } = require('../constants.json');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
// const { token, clientId, guildId } = require('../config.json');
// const { Client, Collection, Intents } = require('discord.js');
// const fs = require('fs');
// const { SlashCommandBuilder } = require('@discordjs/builders');
// const path = require('path');
// const { GameStorage } = require('../initialisation/GameStorage')
// const { lookingForGameCommand } = require('../constants.json')


// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// const commands = [];
// const commandFiles = fs.readdirSync('../commands/').filter(file => file.endsWith('.js'));

// const commandFiles = fs.readdirSync('../commands/lookingForGame');

// fs.readFileSync('../commands/lookingForGame')

// require('../commands/lookingForGame')

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isAutocomplete()) return;

		if (interaction.commandName === 'lfg') {
			const focusedOption = interaction.options.getFocused(true);

			let choices;

			if (focusedOption.name === 'game') {
				choices = ['faq', 'install', 'collection', 'promise', 'debug'];
			}

			// if (focusedOption.name === 'theme') {
			// 	choices = ['halloween', 'christmas', 'summer'];
			// }

			const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));

			const response = await interaction.respond(
				filtered.map(choice => ({ name: choice, value: choice })),
			);
			console.log(response);
		}
	},
};
