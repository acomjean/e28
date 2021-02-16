// Define the options of our application
const Game = {
    data() {
        return {
            newItemName: '',
            list: [],
        }
    },
    methods: {
        addToList() {
            // Note how data newItemName are accessed via `this`
            this.list.push(this.newItemName);
            this.newItemName = '';
        }
    }


}

// Create a new Vue instance using our options
const app = Vue.createApp(Game).mount('#app');