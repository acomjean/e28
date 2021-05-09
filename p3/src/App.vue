<template>
    <div v-cloak>
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
        <hr />
        <!-- for now no messages. Till we get a better handle on them.
        <div v-if="messages.length > 0">
            <ul>
                <li
                    v-for="message in messages"
                    v-bind:to="message"
                    v-bind:key="message"
                >
                    {{ message }}
                </li>
            </ul>
            <button v-on:click="clearMessages()">Clear</button>
        </div>
-->
        <!-- Show the routed component -->
        <!--  v-on:add-to-itinerary="addToItinerary($event)"
            v-on:remove-from-itinerary="removeFromItinerary($event)"
            v-on:update-itinerary="updateItinerary($event)"
                        v-bind:itinerary-details="itinerary"
            v-bind:itinerary-details-by-id="itineraryByMemberID" -->

        <router-view
            v-bind:artist-data="artistData"
            v-bind:image-base-url="imageBaseUrl"
            v-bind:messages="messages"
        >
        </router-view>
    </div>
</template>
<script>
//import { axios } from "@/common/app.js";
import artistData from "@/common/all_artists_2021.json";

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
            userID: 7,
            errors: "",
            showConfirmation: false,
            imageBaseUrl: "https://www.somervilleopenstudios.org",
        };
    },

    computed: {
        itineraryByMemberID() {
            var itinByID = {};
            for (var i = 0; i < this.itinerary.length; i++) {
                var memberID = this.itinerary[i]["member_id"];
                itinByID[memberID] = this.itinerary[i];
            }
            return itinByID;
        },
    },
    mounted() {
        this.loadItinerary();
    },

    methods: {
        loadItinerary() {
            this.$store.dispatch("fetchItinerary");
        },
        clearMessages() {
            this.messages = [];
        },

        // Load user for userID (userID hardcoded currently)
        /*
        loadItinerary2() {
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

        addToItinerary(memberID) {
            this.messages.push("adding artist : " + memberID);
            var oneItinerary = {
                member_id: memberID,
                user_id: this.userID,
                visited: false,
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
            this.messages.push("removing id : " + memberID);

            // there should only be on..  But lets remove all matching.

            for (var i = 0; i < this.itinerary.length; i++) {
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
        updateItinerary(updateDetails) {
            var memberID = updateDetails.memberID;
            var updateData = {
                user_id: this.userID,
                visited: updateDetails.visited,
                member_id: memberID,
                rating: updateDetails.details.rating,
                comment: updateDetails.details.comment,
            };

            for (var i = 0; i < this.itinerary.length; i++) {
                // find mathcing itinerary records. update

                if (memberID == this.itinerary[i].member_id) {
                    axios
                        .put("/itinerary/" + this.itinerary[i].id, updateData)
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
        */
    },
};
</script>

<style src='@/assets/css/p2.css'></style>


<style>
[v-cloak] {
    display: none;
}

/* From zipfoods example */

nav ul {
    list-style-type: none;
}

nav ul li {
    display: inline-block;
}

nav ul li a:link,
a:visited,
a:hover,
a:active {
    /* Ref: https://stackoverflow.com/a/49783868 for why inline-block is added */
    text-transform: capitalize;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    color: var(--blue);
    font-weight: bold;
}

nav ul li a.router-link-active:link,
a.router-link-active:active {
    text-decoration: none;
    color: var(--black);
    background-color: var(--light-blue);
    cursor: inherit;
}
</style>
