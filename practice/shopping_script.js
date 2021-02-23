// Define the options of our application
const Game = {
    data() {
        return {
            itemQuantity: 1,
            newItemName: 'egg',
            list: [],
        }
    },
    methods: {
        addToList() {

            // Note how data newItemName are accessed via `this`
            if (this.newItemName.length > 0) {

                this.list.push({ quantity: this.itemQuantity, item: this.newItemName });
                this.newItemName = 'ham';
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