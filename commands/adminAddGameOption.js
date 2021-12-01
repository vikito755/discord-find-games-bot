const { SlashCommandBuilder } = require('@discordjs/builders');

// Allows admin to add a game option.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('add_game')
        .setDescription("Add a game to the list of games."),
    async execute(interaction) {
        console.log(interaction);
        await interaction.reply(`Game added.`);
    },
};
