class GameLobby
{
    constructor(params)
    {
        this.game=params.game;
        this.amountOfPlayers=params.amountOfPlayers;
        
        console.log('constructor of GameLobby class called: ');
        console.log(this.game+' is your game.');
        console.log(this.amountOfPlayers+' is your language');
    }

    age() {
        return("AGE FUNCTION");
      }
}

module.exports.GameLobby = GameLobby;