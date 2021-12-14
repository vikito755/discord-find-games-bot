# discord-find-games-discord-bot
Discord bot to help people find people to play video games with.

Discord js docs:
https://discord.js.org/#/docs/main/stable/class/CommandInteractionOptionResolver


I need to come back to this (user interaction and guild IDs):
https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

More complex command options: https://discordjs.guide/interactions/registering-slash-commands.html#subcommands

Discord guide progress - https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

https://discordjs.guide/popular-topics/faq.html#how-do-i-kick-a-user





latest issue resolvers (4.12.2021)
https://www.reddit.com/r/Discord_Bots/comments/pmcjh3/discordapierror10002_unknown_application/

https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands

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
- clientId - is taken from the discord developer dashboard.
- token - your secret token from the Discord dashboard DO NOT REVEAL IT to anyone. It is like a password to your instance of the bot.
- guildId - enter Discord's developer mod, right click on the server icon where you intend to use the bot. Copy the ID and paste it in.
2. In "constants.json":
- In the line: "botManagerRoleId": "915647770503835659", change "915647770503835659" with the ID of the role that you will be managing the bot. You can do that by being in Discord developer mode, click on a user that has this role, right click the role and copy the ID.
- You can change  "millisecondsBeforeLobbyReset": 1800000 and "timeForVoting": 86400000 to values you'd like the lobbies to be active for and adjust the time for voting on new games (the values are in millisecond).
3. Create an invite link for the bot with the "bot" and "application.commands" permissions in the 'Oauth2" tab in the Discord developer portal dashboard.
4. Run "npm install" (to install all depencies).
5. In the terminal where the bot will run do "npm run startBot"



To invite the bot (this may change if the bot needs more or less permissions):
https://discord.com/api/oauth2/authorize?client_id=907048337155432479&permissions=0&scope=bot%20applications.commands


 Try to do it with 1 command at first, then scale it up with a for loop.

<h3> Later development notes</h3>

- Add it in the voting and changes scripts later
 Later:
  - Commands for the admins to add and remove games, from the "games.json" file or the future database.
  - Community voting to add games, to sthe "games.json" file or the future database.

<h2>Side notes:</h2>
- Limit the bot to 1 channel and have a slow mode for 5 minutes, to avoid spam.


<h2>Issues and fixes:</h2>
- The game module loads bot on "node deploy.js" and on "botStart.js". Which can be cumbersome if 100s of games are added.
- Make sure that 2 games with the same name can't be added.
- For the sake of "objects/GameWrapper.js", rewrite the "games.json file so there are only game objects without the array all games. So you can just write to it without needing to read the file.
- In 'events/gameAutocomplets.js', make it so the user sees the most relevant option as they type. Currently if the user types he sees no options.
- Overcome the limit of 25 games for autocomplete.


<h2>Features to be considered:</h2>
- Get the number of active users with a role, how much growth it has, how many people were looking for a game. So you can figure out which games are most wanted and played.

<h2>Folders:</h2>
- commands - contains one "/" command per file, gets loaded into "botStart.js" when it runs.
- events - contains all events to which the bot listens, one per file.
- responses - reactions of the bot to all commands, also used to precompile large lists (currently list of games), so it can scale and be fast later, it triggers on both "node deploy.js" and "node botStart.js".
- responses - reactions of the bot to all commands, also used to precompile large lists (currently list of games), so it can scale and be fast later, it triggers on both "node deploy.js" and "node botStart.js".
- objects - contains class definitions and precompilations so objects from those classes can be created and exported for later use.

<h2>Files:</h2>
constants.json - constant variables I'd like to use across files.



<h2>Testing:</h2>
- Test if the lobbies reset after 30 minutes.
- Check if lobbies affect each other. (starte CS and Rocket League lobby at different times and see if one of the lobbies stops both).
- Test if the games added through command have lobbies with the amount of palyers described.
