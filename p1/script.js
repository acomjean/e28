// Define the options of our application
const Game = {
    data() {
        return {
            name: "",
            gameHistory: [
                { number: 1, winner: 'Player', coin: 'heads', choice: 'heads' },
                { number: 2, winner: 'Computer', coin: 'tails', choice: 'heads' },
                { number: 3, winner: 'Computer', coin: 'heads', choice: 'tails' },
                { number: 4, winner: 'Player', coin: 'tails', choice: 'tails' },
            ],
            gameState: "beginning",
            gameNumber: 0,
            scoreUser: 0,
            scoreComputer: 0
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

        },

        deleteRound(number) {
            this.rounds = this.rounds.filter(round => round.number != number);
        },

        takeTurn(userMove) {

            let scoreUser = this.scoreUser;
            let scoreComputer = this.scoreComputer;

            computerMove = "C";
            this.gameNumber += 1;
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
            this.scoreComputer = scoreComputer;
            this.scoreUser = scoreUser;
        }


    }


}



const RoundDetail = {
    name: 'RoundDetail',
    props: {
        number: {
            type: Number,
            default: 0
        },
        winner: {
            type: String
        },
        choice: {
            type: String
        }
    },
    data() {
        return {
        }
    },
    template: '#round-detail'
}

// Root Vue instance
// 
const app = Vue.createApp(Game)
app.component('round-detail', RoundDetail);
app.mount('#app');

