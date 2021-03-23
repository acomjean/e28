// Define the options of our application
const Game = {
    data() {
        return {
            name: "Aram",
            gameDetails: [],   // array of turn details 
            gameState: "started",
            gameTurn: 1,     // turn #
            maxTurns: 8,   //turns per game
            gameNumber: 1,   // you can play multiple games against various opponents
            scoreUser: 0,    // current game score
            scoreComputer: 0,  //computers game score
            computerOpponents: [{ id: 1, name: "Friendly" }, { id: 2, name: "Angry" }, { id: 3, name: "Tit-For-Tat" }, { id: 4, name: "Unforgiving" }],
            computerOpponentIndex: 0,
            computerOpponentsPlayed: [],
            gameResults: [], // summary of all games played,

            moveicons: { C: '✅️', D: '❌' }

        }
    },

    computed: {


        // Get the results of the last gamed played.
        lastGameResult() {
            if (this.gameResults.length > 0) {
                return this.gameResults[this.gameResults.length - 1];
            } else {
                return null;
            }

        }

    },


    methods: {

        // Reset
        resetGame() {
            this.gameState = "started";
            this.gameDetails = [];
            this.computerOpponentsPlayed =[];
            this.gameTurn = 1;
            this.scoreComputer = 0;
            this.scoreUser = 0;
            // get a random opponent
            this.computerOpponentIndex = Math.floor(Math.random() * this.computerOpponents.length);
        },


        startNextGame() {
            this.gameState = "started";
            this.gameDetails = [];
            this.gameTurn = 1;
            this.scoreComputer = 0;
            this.scoreUser = 0;
            // get a random opponent that you haven't played before.
            // We have a list of algorithms played, so make an array of elligible indexes
            // and pick one at random.
            let unplayed = [];

            for (let i=0; i < this.computerOpponents.length; i++){
                console.log (this.computerOpponentsPlayed);

                if (! this.computerOpponentsPlayed.includes(i)){
                    console.log("adding unplayed " + i)
                    unplayed.push(i)
                }
            }

            // pick one of the uplayed algorithms in our array
            this.computerOpponentIndex = unplayed[Math.floor(Math.random() * unplayed.length)];
        },



        goBackToRound(turn) {
            console.log("turn" + turn);
            this.gameDetails = this.gameDetails.filter(oneTurn => oneTurn.turn < turn);
            this.gameTurn = turn;
            this.scoreUser = this.gameDetails[this.gameDetails.length - 1]['humanGameScore']
            this.scoreComputer = this.gameDetails[this.gameDetails.length - 1]['computerGameScore']
        },

        //Computer Move Calculator.. Returns C or D string
        //
        computerMove() {


            if (this.computerOpponentIndex == 0) {
                return "C";
            }

            if (this.computerOpponentIndex == 1) {
                return "D";
            }

            if (this.computerOpponentIndex == 2) {
                if (this.gameTurn == 1) {
                    return "C";
                } else {
                    let turnIndex = this.gameTurn - 1;
                    console.log(turnIndex);
                    return this.gameDetails[this.gameDetails.length - 1]['humanMove'];
                }
            }

            if (this.computerOpponentIndex == 3) {
                let humanDefectsCount = 0;
                for (let i = 0; i < this.gameDetails.length; i++) {
                    if (this.gameDetails[i]['humanMove'] === 'D') {
                        humanDefectsCount++;
                    }
                }
                // if the human has defected 2 or more times don't cooperate again
                if (humanDefectsCount >= 1) {
                    return "D";
                } else {
                    return "C";
                }
            }

        },

        // Process The Users turn

        takeTurn(userMove) {

            var scoreComputer = 0;
            var scoreUser = 0;

            var computerMove = this.computerMove();

            switch (userMove) {
                case 'C':
                    if (computerMove == "C") {
                        scoreUser += 3;
                        scoreComputer += 3;
                    } else {
                        scoreUser += 1;
                        scoreComputer += 4;
                    }
                    break;

                case 'D':
                    if (computerMove == "C") {
                        scoreUser += 4;
                        scoreComputer += 1;
                    } else {
                        scoreUser += 2;
                        scoreComputer += 2;
                    }
                    break;

                default:
                    console.log('err')
            }

            console.log('compuiter:' + scoreComputer + " User score " + scoreUser)
            this.scoreComputer += scoreComputer;
            this.scoreUser += scoreUser;

            // Store turn in History:

            this.gameDetails.push({
                turn: this.gameTurn,
                humanMove: userMove,
                computerMove: computerMove,
                humanTurnScore: scoreUser,
                computerTurnScore: scoreComputer,
                humanGameScore: this.scoreUser,
                computerGameScore: this.scoreComputer
            });



            this.gameTurn += 1;

            // check if game is over

            if (this.gameTurn >this.maxTurns) {
                this.gameNumber += 1;
                this.gameState = "gameOver";

                var outcome = '';
                var displayClass = '';
                if (this.scoreComputer > this.scoreUser) {
                    outcome = "You Lost";
                    displayClass = "lost";
                } else if (this.scoreComputer === this.scoreUser) {
                    outcome = "Tie";
                    displayClass = "tie";
                } else {
                    outcome = "You Won";
                    displayClass = "winner";
                }

                this.gameResults.push({
                    yourScore: this.scoreUser, computerScore:
                        this.scoreComputer, opponentIndex: this.computerOpponentIndex,
                    result: outcome,
                    displayClass: displayClass
                })
                this.computerOpponentsPlayed.push (this.computerOpponentIndex)


                // you've played all the algorithms.
                if (this.computerOpponentsPlayed.length == this.computerOpponents.length){
                    this.gameState="finished";

                }


            }
        }
    }
}



const TurnDetail = {
    name: 'TurnDetail',
    props: {
        turn: {
            type: Number,
            default: 0
        },
        humanMove: {
            type: String
        },
        computerMove: {
            type: String
        },
        humanTurnScore: {
            type: Number,
        },
        computerTurnScore: {
            type: Number,
        },
        humanGameScore: {
            type: Number,
        },
        computerGameScore: {
            type: Number,
        },
        gameState: {
            type: String
        }

    },


    data() {
        return {
        }
    },
    template: '#turn-detail'
}






// Root Vue instance
// 
const app = Vue.createApp(Game)
app.component('turn-detail', TurnDetail);
app.mount('#app');

