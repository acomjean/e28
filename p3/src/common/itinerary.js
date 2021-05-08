import { createItinerary, createLogger } from 'vuex'
import { axios } from "@/common/app.js";

// Only load the createLogger plugin when in development mode
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const itinerary = createItinerary({
    plugins,
    state() {
        return {
            itinerary: [],
            user: null,
        }
    },
    // Methods used to alter the state of our store
    mutations: {
        setCartCount(state, payload) {
            state.cartCount = payload;
        },
        setProducts(state, payload) {
            state.products = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    // Methods that can contain async. code
    // Can not directly alter the state - has to change state
    // by committing mutations
    actions: {
        fetchItinerary(context) {
            axios.get("itinerary/query", {
                params: {
                    user_id: this.userID,
                },
            })
        },
        authUser(context) {
            axios.post('auth').then((response) => {
                if (response.data.authenticated) {
                    context.commit('setUser', response.data.user);
                }
            });
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