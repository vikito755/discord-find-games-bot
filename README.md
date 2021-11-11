# discord-find-games-discord-bot
DIscord bot to help people find people to play video games with.

I need to come back to this (user interaction and guild IDs):
https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

More complex command options: https://discordjs.guide/interactions/registering-slash-commands.html#subcommands

Discord guide progress - https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot


Bot invite link (add commands here):
https://discordjs.guide/creating-your-bot/creating-commands.html#the-problem-with-if-else-if

When using the bot, rename the "example-config.json" to "config.json" and set the variables according to the values in your Discord developer dashboard.
To find the "guildId", turn on Discord developer mode (in the app), right click the server icon on the left and copy that id, that is "guildId".

TODO:
- Refactor the file in the "events" folder, see if you need it.
- test out user interactions
- If games are changed, redundant roles will need to be removed from the server and the users.

To invite the bot (this may change if the bot needs more or less permissions):
https://discord.com/api/oauth2/authorize?client_id=907048337155432479&permissions=0&scope=bot%20applications.commands

Run instructions:
1. Rename the "example-config.json" file to "config.json", replace with appropriate variables.
2. Create an invite link for the bot with the "bot" and "application.commands" permissions in the 'Oauth2" tab in the Discord developer portal dashboard.
3. Run "node deploy.js", to make all commands usable.
- Every time the "deploy.js" file is run, the new commands become active, no need for restart (tested on Discord API version 9).
4. Run "node bot.js". To make the bot active

folders:
- commands - contains one "/" command per file, gets loaded into "bot.js" when it runs.
- events - contains all events to which the bot listens, one per file.
- responses - reactions of the bot to all commands, also used to precompile large lists (currently for games), so it can scale and be fast later.