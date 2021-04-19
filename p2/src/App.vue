<template>
    <div>
        <img alt="Vue logo" src="./assets/logo.png" />
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
            v-bind:artistData="artistData"
            v-bind:itineraryDetails="itinerary"
        >
        </router-view>

        {{ artistList }}
    </div>
</template>
<script>
import artistData from "@/common/all_artists_2021.json";
import { axios } from "@/common/app.js";

export default {
    name: "App",

    data() {
        return {
            itinerary: [],
            artistData: artistData,
            links: ["Home", "Browse Artists", "Itinerary"],
            /* Map links to  the appropriate component */
            paths: {
                Home: "/",
                "Browse Artists": "/browse-artists",
                Itinerary: "/itinerary",
            },
            userID: 1,
            errors: "",
            showConfirmation: false,
        };
    },

    mounted() {
        this.loadItinerary();
    },
    methods: {
        loadItinerary() {
            axios.get("itinerary").then((response) => {
                this.itinerary = response.data.itinerary;
            });
        },
        // This is the root function, so add the event.

        addToItinerary(artist_member_id) {
            var oneItinerary = {
                artist_member_id: artist_member_id,
                user_id: this.userID,
            };
            axios.post("/itinerary", oneItinerary).then((response) => {
                if (response.data.errors) {
                    this.errors = response.data.errors;
                    this.showConfirmation = false;
                } else {
                    this.$emit("update-products");
                    this.showConfirmation = true;
                }
            });
            console.log("add Art ID" + artist_member_id);
            console.log(artist_member_id);
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
