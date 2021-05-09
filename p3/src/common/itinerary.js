import { createStore, createLogger } from 'vuex'
import { axios } from "@/common/app.js";


// Only load the createLogger plugin when in development mode
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
    plugins,
    state() {
        return {
            user: 5,
            cartCount: 5,
            itineraryArray: [],
        }
    },

    mutations: {
        setItinerary(state, payload) {
            console.log("setProductssetItinerary");
            state.itineraryArray = payload;
        },
    },

    actions: {

        // get the itinerary via ajax (axios)
        fetchItinerary(context) {
            axios.get("itinerary/query", {
                params: {
                    user_id: this.user,
                },
            }).then((response) => {
                console.log("+-fetchItinerary    -------------+  ");
                console.log(response.data.itinerary);
                console.log("+- -------------    -------------+  ");
                context.commit('setItinerary', response.data.itinerary);
            });
        },
    },

    getters: {
        // Take the itinerary and index it by the artist id (Memeber_id)

        itineraryByMemberID: (state) => () => {
            var itinByID = {};
            for (var i = 0; i < state.itineraryArray.length; i++) {
                var memberID = state.itineraryArray[i]["member_id"];
                itinByID[memberID] = state.itineraryArray[i];
            }

            return itinByID;
        }
    }

})





/*
import { createStore, createLogger } from 'vuex'
import { axios } from "@/common/app.js";

// Only load the createstore plugin when in development mode
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const itineraryvuex = createStore({
    plugins,
    state() {
        return {
            itinerary: [],
        }
    },

    mutations: {
        setItinerary(state, payload) {
            state.itinerary = payload;
        }

    },
    // Methods that can contain async. code
    // Can not directly alter the state - has to change state
    // by committing mutations
    actions: {
        fetchItinerary() {
            axios.get("itinerary/query", {
                params: {
                    user_id: this.userID,
                },
            })//.then((response) => {
            //   context.commit('setItinerary', response.data);
            // });
        },
    },
    getters: {
        getItinerary(state) {
            return function () {
                return state.itinerary
            }
        }
    }
})
*/