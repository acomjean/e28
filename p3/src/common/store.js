import { createStore, createLogger } from 'vuex'
import { axios } from "@/common/app.js";


// Only load the createLogger plugin when in development mode
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

// load artists data from file.  Static, but part of global state.
import artistData from "@/common/all_artists_2021.json";

export const store = createStore({
    plugins,
    state() {
        return {
            user: null,
            userData: null,
            itineraryArray: [],
            imageBaseUrl: "https://www.somervilleopenstudios.org",
            artistData: artistData
        }
    },

    mutations: {
        setItinerary(state, payload) {
            state.itineraryArray = payload;
        },

        setUser(state, payload) {
            state.user = payload['id'];
            state.userData = payload;
            // reset itinerary state if user has logged out. 
            if (payload == false) {
                state.itineraryArray = [];
            }
        }
    },

    actions: {

        // From ZipFoods 
        authUser(context) {
            return new Promise((resolve) => {
                axios.post('auth').then((response) => {
                    if (response.data.authenticated) {
                        context.commit('setUser', response.data.user);
                    } else {
                        context.commit('setUser', false);
                    }

                    resolve();
                });
            });
        },

        // get the itinerary via ajax (axios)
        fetchItinerary(context) {
            axios.get("itinerary/query", {
                params: {
                    user_id: context.state.user,
                },
            }).then((response) => {
                context.commit('setItinerary', response.data.itinerary);
            });
        },


        addToItinerary(context, memberID) {
            var oneItinerary = {
                member_id: memberID,
                user_id: context.state.user,
                visited: false,
            };
            axios.post("/itinerary", oneItinerary).then((response) => {
                if (response.data.errors) {
                    // There is nothing else to do.. They clicked a button ajax failed.  
                    // Report bug is it.
                    alert("error saving");
                } else {
                    // reload.. The truth is the server.
                    context.dispatch('fetchItinerary')
                }
            });
        },

        removeFromItinerary(context, memberID) {
            // there should only be on..  But lets remove all matching.

            for (var i = 0; i < context.state.itineraryArray.length; i++) {
                if (memberID == context.state.itineraryArray[i].member_id) {
                    axios
                        .delete("/itinerary/" + context.state.itineraryArray[i].id)
                        .then((response) => {
                            if (response.data.errors) {
                                alert("could not remove");

                            } else {
                                // reload..  Technically we could just remove from the array.. But its
                                // another check
                                context.dispatch('fetchItinerary');
                            }
                        });
                }
            }
        },

        updateItinerary(context, updateDetails) {
            var memberID = updateDetails.memberID;
            var updateData = {
                user_id: context.state.user,
                visited: updateDetails.visited,
                member_id: memberID,
                rating: updateDetails.details.rating,
                comment: updateDetails.details.comment,
            };

            for (var i = 0; i < context.state.itineraryArray.length; i++) {

                // find mathcing itinerary records. update all

                if (memberID == context.state.itineraryArray[i].member_id) {
                    axios
                        .put("/itinerary/" + context.state.itineraryArray[i].id, updateData)
                        .then((response) => {
                            if (response.data.errors) {
                                context.state.errors = response.data.errors;
                                context.state.showConfirmation = false;
                            } else {
                                // reload..  Technically we could just remove from the array.. But its
                                // another check
                                context.dispatch('fetchItinerary');
                            }
                        });
                }
            }
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

