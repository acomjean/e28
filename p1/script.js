// Define the options of our application
const Game = {
    data() {
        return {
            name: "Aram",
            gameDetails: [],   // array of turn details 
            gameState: "started",
            gameTurn: 1,     // turn #
            gameNumber: 1,   // you can play multiple games against various opponents
            scoreUser: 0,    // current game score
            scoreComputer: 0,  //computers game score
            computerOpponents: [{ id: 1, name: "Friendly" }, { id: 2, name: "Angry" }, { id: 3, name: "TFT" }, { id: 4, name: "grumpy" }],
            computerOppenentIndex: 0,
            gameResults: [] // summary of all games played

        }
    },

    computed: {

        // get id of computer algorithm
        oponentID() {
            return 3;
        },

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

        startGame() {
            this.guess = 1;
            this.gameRounds = [];
            this.gameState = "started";
            this.gameDetails = [];
            this.gameTurn = 1;
            this.scoreComputer = 0;
            this.scoreUser = 0;
        },

        goBackToRound(turn) {
            console.log("turn" + turn);
            this.gameDetails = this.gameDetails.filter(oneTurn => oneTurn.turn < turn);
            this.gameTurn = turn;
        },

        //Computer Move Calculator.. Returns C or D string
        //
        computerMove() {


            if (this.oponentID == 1) {
                return "C";
            }

            if (this.oponentID == 2) {
                return "D";
            }

            if (this.oponentID == 3) {
                if (this.gameTurn == 1) {
                    return "C";
                } else {
                    let turnIndex = this.gameTurn - 1;
                    console.log(turnIndex);
                    return this.gameDetails[this.gameDetails.length - 1]['humanMove'];
                }
            }

            if (this.oponentID == 4) {
                let humanDefectsCount =0;
                for (let i=0; i<)
            }

        },



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

            // Store move in History:


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

            // check if game is over (8.. hard coded..)

            if (this.gameTurn > 8) {
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

                this.gameResults.push({ your_score: this.scoreUser, computerScore: this.scoreComputer, opponent_id: this.oponentID, result: outcome, displayClass: displayClass })


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

