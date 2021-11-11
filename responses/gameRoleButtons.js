const { allGames } = require('../games.json')
const { MessageButton } = require('discord.js');

// Precompiling all lists on deploy so they are not getting calculated every time.
let gameRoleButtons = [];

allGames.map( game => {
    gameRoleButtons.push(
        new MessageButton()
					.setCustomId(`pm-${game}`)
					.setLabel(`${game}`)
					.setStyle('PRIMARY')
    )
})

console.log('Precompilled all game role buttons.')

module.exports.gameRoleButtons = gameRoleButtons;