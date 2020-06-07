class Game{
    constructor(pl1, pl2){
        this.players = [pl1, pl2]
        this.turns = [null, null]
        this.userNames = [null, null]
        this.score = [0,0]

        this.sendMsgToAll("Game Starts!")

        this.players.forEach((player, index)=>{
            player.on('turn', (turn)=>{
                console.log(turn)
                this.onTurn(index, turn)
            })
        })
    }

    sendMsgToPlayer(playerIndex, msg){
        this.player[playerIndex].emit('message', msg)
    }

    sendMsgToAll(msg){
        this.players.forEach(player=>{
            player.emit("message", msg)
        })
    }

    sendToGameBox(playerIndex, msg) {
        this.players[playerIndex].emit('game', msg)
    }

    sendResultToGameBox(msg){
        this.players.forEach(player=>{
            player.emit("game", msg)
        })
    }

    addScore(msg){
        this.players.forEach(player=>{
            player.emit("score", msg)
        })
    }

    onTurn(playerIndex, turn){
        if(this.turns[playerIndex] === null){
            this.turns[playerIndex]=turn;
            if (turn === 'rock'){
                this.sendToGameBox(playerIndex, `You selected <i style="color: var(--rock); font-size:25px; -webkit-text-stroke: 1px black !important;" class="fas fa-hand-rock"></i>`);
            }        
            else if (turn === 'paper') {
                this.sendToGameBox(playerIndex, `You selected <i style="color:  var(--paper); font-size:25px; -webkit-text-stroke: 1px black !important;" class="fas fa-hand-paper"></i>`);
            }
            else if (turn === 'scissors'){
                this.sendToGameBox(playerIndex, `You selected <i style="color: var(--scissors); font-size:25px; -webkit-text-stroke: 1px black !important;" class="fas fa-hand-scissors"></i>`);
            }            
            this.checkIsGameOver();
        }
        else{
            this.sendToGameBox(playerIndex, `You already select turn`);
        }
    }

    checkIsGameOver(){
        let turns = this.turns;
        if(turns[0] && turns[1]){
            this.sendResultToGameBox(`Game over: <i style="color: var(--${turns[0]}); font-size:25px; -webkit-text-stroke: 1px black !important;" class="fas fa-hand-${turns[0]}"></i> : <i style="color: var(--${turns[1]}); font-size:25px; -webkit-text-stroke: 1px black !important;" class="fas fa-hand-${turns[1]}"></i>`)
            this.getWinner()
            this.turns = [null, null]
            this.sendResultToGameBox('<span style="border-bottom: 2px solid tomato; color:tomato; font-weight:500 ">Next Round!!!</span>')
        }
    }

    getWinner(){
        const p0 = this.decodeTurn(this.turns[0]);
        const p1 = this.decodeTurn(this.turns[1]);

        const distance = (p1 - p0 + 3) % 3;

        switch(distance){
            case 0:
                this.sendResultToGameBox('<span style="font-size:1.2rem; font-weight:600; font-style: italic">It is draw !!!</span>');
                break;
            case 1:
                this.sendMsgOnEndGame(this.players[0], this.players[1])
                this.score[0] +=1;
                this.score[1] +=0 
                //dodaj jedan poen za prvog igraca
                break;
            case 2:
                this.sendMsgOnEndGame(this.players[1], this.players[0])
                this.score[0] +=0;
                this.score[1] +=1 
                //dodaj jedan poen za drugog igraca
                break;
            }
                
        this.sendOpponentScore([this.score[1], this.score[0]])
        this.sendUserScore([this.score[0], this.score[1]])
    }

    sendUserScore(sc){
        this.players[0].emit('score', sc)
    }
    
    sendOpponentScore(sc){
        this.players[1].emit('score', sc)
    }

    sendMsgOnEndGame(winner, loser){
        winner.emit('game', '<span style="font-size:1.2rem; font-weight:600; font-style: italic">You Won !!!</span>');
        loser.emit('game', '<span style="font-size:1.2rem; font-weight:600; font-style: italic">You Lost !!!</span>')
    }

    decodeTurn(turn) {
        switch(turn){
            case 'rock':
                return 0;
            case 'scissors':
                return 1;
            case 'paper':
                return 2;
        }
    }
}

module.exports = Game;