// Define the options of our application
const Game = {
    data() {
        return {
            guesses: 1,
            user: '',
            word_shuffled: '',
            word: ''
        }
    },
    computed: {
        word_shuffled() {
            // https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
            var wordarray = this.split(""),
                n = wordarray.length;


            for (var i = n - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = wordarray[i];
                wordarray[i] = wordarray[j];
                wordarray[j] = tmp;
            }
            return wordarray.join("");
        }
    }


    methods: {
        addToList() {

            // Note how data newItemName are accessed via `this`
            if (this.newItemName.length > 0) {
                this.totalItems +=
                    this.list.push({ quantity: this.itemQuantity, item: this.newItemName });
                this.newItemName = '';
                this.itemQuantity = 1;

            }
        },
        removeFromList(index, e) {
            // Splice to remove array element
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
            this.list.splice(index, 1);

        }

    }


}

// Create a new Vue instance using our options
const app = Vue.createApp(Game).mount('#app');