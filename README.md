# discord-find-games-discord-bot
DIscord bot to help people find people to play video games with.

Discord guide progress - https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot


Bot invite link (add commands here):
https://discordjs.guide/creating-your-bot/creating-commands.html#the-problem-with-if-else-if

When using the bot, rename the "example-config.json" to "config.json" and set the variables according to the values in your Discord developer dashboard.
To find the "guildId", turn on Discord developer mode (in the app), right click the server icon on the left and copy that id, that is "guildId".

TODO:
- Separate the commands in a different folder.
- Make the commands more maintanable, no if-else, described in the following article( or the next one)
https://discordjs.guide/creating-your-bot/creating-commands.html#the-problem-with-if-else-if
- test out user interactions

To invite the bot (this may change if the bot needs more or less permissions):
https://discord.com/api/oauth2/authorize?client_id=907048337155432479&permissions=0&scope=bot%20applications.commands

Run instructions:
1. Rename the "example-config.json" file to "config.json", replace with appropriate variables.
2. Create an invite link for the bot with the "bot" and "application.commands" permissions in the 'Oauth2" tab in the Discord developer portal dashboard.
3. Run "node commands/deploy.js"
4. Run "node bot.js".