// Define the options of our application
const Game = {
    data() {
        return {
            name: "Aram",
            gameDetails: [],
            gameState: "started",
            gameTurn: 1,
            gameNumber: 1,   // you can play multiple games against various opponents
            scoreUser: 0,
            scoreComputer: 0,
            computerOppents: []

        }
    },

    computed: {

        // get id of computer algorithm
        oponentID() {
            return 1;
        }
    },


    methods: {
        startGame() {
            this.guess = 1;
            this.gameRounds = [];
            this.gameState = "started";
            this.gameDetails = [];

        },

        goBackToRound(turn) {
            console.log("turn" + turn);
            this.gameDetails = this.gameDetails.filter(oneTurn => oneTurn.turn < turn);
            this.gameTurn = turn;
        },

        takeTurn(userMove) {

            var scoreComputer = 0;
            var scoreUser = 0;

            var computerMove = "C";

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
            }
            );



            this.gameTurn += 1;



            // check if game is over (8.. hard coded..)
            if (this.gameTurn > 8) {
                this.gameNumber += 1;
                this.gameState = "gameOver";
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

