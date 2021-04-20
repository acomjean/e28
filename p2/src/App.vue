<template>
    <div>
        <!--
            <img alt="Vue logo" src="./assets/logo.png" />
        -->
        <h2>Art Browser</h2>
        <nav>
            <ul>
                <li>
                    <router-link
                        v-for="link in links"
                        v-bind:key="link"
                        v-bind:to="paths[link]"
                        >{{ link }}
                    </router-link>
                </li>
            </ul>
        </nav>
        <!-- Show the routed component -->
        <router-view
            v-on:add-to-itinerary="addToItinerary($event)"
            v-on:remove-from-itinerary="removeFromItinerary($event)"
            v-on:update-itinerary="addToItinerary($event)"
            v-bind:artistData="artistData"
            v-bind:itineraryDetails="itinerary"
            v-bind:messages="messages"
        >
        </router-view>
    </div>
</template>
<script>
import artistData from "@/common/all_artists_2021.json";
import { axios } from "@/common/app.js";

export default {
    name: "App",

    data() {
        return {
            messages: [],
            itinerary: [],
            artistData: artistData,
            links: ["Home", "Browse Artists", "Itinerary"],
            /* Map links to  the appropriate component */
            paths: {
                Home: "/",
                "Browse Artists": "/browse-artists",
                Itinerary: "/itinerary",
            },
            userID: 4,
            errors: "",
            showConfirmation: false,
        };
    },

    mounted() {
        this.loadItinerary();
    },
    methods: {
        // Load user for userID (userID hardcoded currently)

        loadItinerary() {
            axios
                .get("itinerary/query", {
                    params: {
                        user_id: this.userID,
                    },
                })
                .then((response) => {
                    console.log();

                    this.itinerary = response.data.itinerary;
                });
        },
        // This is the root function, so add the event.

        addToItinerary(memberID) {
            this.messages.push("** addind member : " + memberID);
            var oneItinerary = {
                member_id: memberID,
                user_id: this.userID,
                visited: true,
            };
            axios.post("/itinerary", oneItinerary).then((response) => {
                if (response.data.errors) {
                    this.errors = response.data.errors;
                    this.showConfirmation = true;
                } else {
                    // reload..  We need the ID.
                    this.loadItinerary();
                }
            });
        },

        removeFromItinerary(memberID) {
            //todo lookup itinerary_if

            this.messages.push("*** removing id : " + memberID);

            // there should only be on..  But lets remove all matching.

            for (var i = 0; i < this.itinerary.length; i++) {
                console.log(memberID + "==" + this.itinerary[i].memberID);
                if (memberID == this.itinerary[i].member_id) {
                    axios
                        .delete("/itinerary/" + this.itinerary[i].id)
                        .then((response) => {
                            if (response.data.errors) {
                                this.errors = response.data.errors;
                                this.showConfirmation = false;
                            } else {
                                // reload..  Technically we could just remove from the array.. But its
                                // another check
                                this.loadItinerary();
                            }
                        });
                }
            }
        },
    },
};
</script>

<style src='@/assets/css/p2.css'></style>


<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
}
</style>
