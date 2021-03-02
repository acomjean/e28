// Define the options of our application
const Game = {
    data() {
        return {
            guess: 0,
            word: '',
            name: '',
            previous_word: '',
            state: "get_name",
            guess_word: '',
            correct: true
        }
    },
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName;
        },


        word_shuffled() {
            console.log("wordarray");
            // https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
            var wordarray = this.word.split(""),
                n = wordarray.length;

            for (var i = n - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = wordarray[i];
                wordarray[i] = wordarray[j];
                wordarray[j] = tmp;
            }
            return wordarray.join("");
        }
    },
    methods: {
        startGame() {
            this.guess = 1;
            console.log("Start Game");
            this.word = "house";
            this.state = "started";
            this.correct = false;

        },

        checkGuess() {

            console.log("check:" + this.guess_word + " - " + this.word)
            if (this.guess_word == this.word) {
                console.log("RIGHT");
                this.feedbackClass = 'right';
                this.correct = true;
                //this.state = "stop"

            } else {
                console.log("wrong");

                this.feedbackClass = 'wrong';
                this.guess += 1;
                this.correct = false;

            }

        }
    }

}

// Create a new Vue instance using our options
const app = Vue.createApp(Game).mount('#app');