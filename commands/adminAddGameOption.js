const { SlashCommandBuilder } = require('@discordjs/builders');
// const { allGamesResponse } = require('../responses/allGames')


// Command that displays all available games. In the future categories may be added.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('add_game')
        .setDescription('Add a game to the list of games.'),
    async execute(interaction) {
        // The argument "ephemeral" means that only the user who submitted the command can see the response.
        await interaction.reply( "Game added");

    },
};
