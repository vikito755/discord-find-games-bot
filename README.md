# discord-find-games-discord-bot
Discord bot to help people find people to play video games with.

Discord js docs:
https://discord.js.org/#/docs/main/stable/class/CommandInteractionOptionResolver


I need to come back to this (user interaction and guild IDs):
https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

More complex command options: https://discordjs.guide/interactions/registering-slash-commands.html#subcommands

Discord guide progress - https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

https://discordjs.guide/popular-topics/faq.html#how-do-i-kick-a-user

<h2>User flow:</h2>
Each "game" is an object with 3 parameters (everything is automated, nothins is imputted by the user):
- Name (string)
- amountOfPlayers (the maximum numbers of players for a game)
- currentPlayers (array of player ID's)


1. User writes "/lfg <predefined game>".
- Gets put into an array.
- A timer for 30 minutes starts.
- When the timer runs out the user gets publicly pinged that the timer ran out.
- The user's name gets popped out of the array.
- If a user types "/lfg" and the maximum players is reached. Empty the array.
- The call gets recorded with a date.
2. Another user types "/lfg <predefined game>"
- All users in the array. Get notified.
- The new user gets notified.



<h1>Run instructions:</h1>

When using the bot, rename the "example-config.json" to "config.json" and set the variables according to the values in your Discord developer dashboard.
To find the "guildId", turn on Discord developer mode (in the app), right click the server icon on the left and copy that id, that is "guildId".

1. Rename the "example-config.json" file to "config.json", replace with appropriate variables.
2. Create an invite link for the bot with the "bot" and "application.commands" permissions in the 'Oauth2" tab in the Discord developer portal dashboard.
3. Run "node deploy.js", to make all commands usable.
- Every time the "deploy.js" file is run, the new commands become active, no need for restart (tested on Discord API version 9).
4. Run "node botStart.js". To make the bot active.

To invite the bot (this may change if the bot needs more or less permissions):
https://discord.com/api/oauth2/authorize?client_id=907048337155432479&permissions=0&scope=bot%20applications.commands


Bot invite link (add commands here):
https://discordjs.guide/creating-your-bot/creating-commands.html#the-problem-with-if-else-if


<h2>TODO:</h2>

<h2>Daily dues</h2>
- Preload the games from the "games.json".
- For each game create a command
 . When the user types "/lf_cs_go" or "lf CS: GO" (more likely as the names will be generated according to the "games.json")
 . Each command needs to:
 1. Put the name of the user who wrote it into an array.
    - This array will be used when another user types it. (How do you avoid multiple tags)
    - This array will reset after a minute.
    - The chat for these commands will have 5 minutes timeout to avoid spam.
 2. Start a 2 minute minute timer (afte which the array resets, the time to reset might need adjustments).
 3. Send a message tagging the user who invoked the command and the other users listed in the array.
 4. Reset the timer.


 Try to do it with 1 command at first, then scale it up with a for loop.

<h3> Later development notes</h3>

- A bot restart is needed after a new command is added. Here is how it can be done: https://stackoverflow.com/questions/48601463/how-do-you-make-a-command-which-restarts-your-bot-in-discord-js
- Add it in the voting and changes scripts later
 Later:
  - Commands for the admins to add and remove games, from the "games.json" file or the future database.
  - Community voting to add games, to sthe "games.json" file or the future database.

<h2>Side notes:</h2>
- Limit the bot to 1 channel and have a slow mode for 5 minutes, to avoid spam.


<h2>Issues:</h2>
- The game module loads bot on "node deploy.js" and on "botStart.js". Which can be cumbersome if 100s of games are added.


<h2>Features to be considered:</h2>
- Get the number of active users with a role, how much growth it has, how many people were looking for a game. So you can figure out which games are most wanted and played.

<h2>Folders:</h2>
- commands - contains one "/" command per file, gets loaded into "bot.js" when it runs.
- events - contains all events to which the bot listens, one per file.
- responses - reactions of the bot to all commands, also used to precompile large lists (currently list of games), so it can scale and be fast later, it triggers on both "node deploy.js" and "node bot.js".

<h2>Files:</h2>
constants.json - constant variables I'd like to use across files.


