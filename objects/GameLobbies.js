const { allGames } = require('../games.json')
const { normaliseCommandName } = require('../utilities/names');

class GameLobby
{
    constructor(params)
    {
        this.game=params.game;
        this.amountOfPlayers=params.amountOfPlayers;
        this.currentPlayers = [];
        
        // console.log('constructor of GameLobby class called: ');
        // console.log(
        //     Object.keys(allGames).map( (game) => {
        //         console.log(" ")
        //         console.log("A GAME")
        //     console.log(allGames[game]['name']);}));
        // console.log(Object.keys(allGames));
        // console.log(this.game+' is your game.');
        // console.log(this.amountOfPlayers+' is your language');
    }

    addPlayer() {
        this.currentPlayers.push("New player ID");
      }
}

let test = [];


//     Object.keys(allGames).map( (game) => {
//         Object.assign( test, {game: new GameLobby({game: allGames[game].name, amountOfPlayers: allGames[game].maxPlayers})} );

//         test +=  {...{game: new GameLobby({game: allGames[game].name, amountOfPlayers: allGames[game].maxPlayers})}} 
//     });

    for (var i = 0; i < Object.keys(allGames).length; i++) {

        
        this[`${allGames[Object.keys(allGames)[i]].name}`] = new GameLobby({game: allGames[Object.keys(allGames)[i]].name, amountOfPlayers: allGames[Object.keys(allGames)[i]].maxPlayers});

        test.push(this[`${allGames[Object.keys(allGames)[i]].name}`]);

        console.log(this[allGames[Object.keys(allGames)[i]].name])
        
        

        // test.push(this[allGames[Object.keys(allGames)[i]].name]);
     }

// allGames.map( game => {
//     console.log(game);
    
//     console.log(allGames[game]);
//     Object.assign(gameLobbies, new GameLobby({game: game, amountOfPlayers: 5 }));
// })
// console.log("  ");
// console.log(gameLobbies);

module.exports.GameLobbies = test;