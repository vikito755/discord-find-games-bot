const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message } = require('discord.js');
const { Client, Collection, Intents } = require('discord.js');
const { gameRoleButtons } = require('../responses/gameRoleButtons')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = {
    data: new SlashCommandBuilder()

    .setName('get_game_role')
    .setDescription('Display a list of all available games you can get notified for!'),
    async execute(interaction) {

        const row = new MessageActionRow()
			.addComponents(
				gameRoleButtons
			)

        // The argument "ephemeral" means that only the user who submitted the command can see the response.
        await interaction.reply( {content: "Pick a game (you can pick multiple by using the command again)",  ephemeral: true, components: [row]});
        // await message.guild.roles.find(r => r.name === '{Role Name}')


        },

    };
    