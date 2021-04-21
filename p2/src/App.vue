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
        <!-- Show the routed component -->
        <router-view
            v-on:add-to-itinerary="addToItinerary($event)"
            v-on:remove-from-itinerary="removeFromItinerary($event)"
            v-on:update-itinerary="updateItinerary($event)"
            v-bind:artist-data="artistData"
            v-bind:itinerary-details="itinerary"
            v-bind:messages="messages"
            v-bind:image-base-url="imageBaseUrl"
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
            userID: 5,
            errors: "",
            showConfirmation: false,
            imageBaseUrl: "https://www.somervilleopenstudios.org",
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
                            }
                        });
                }
            }
            this.loadItinerary();
        },
        updateItinerary(updateDetails) {
            console.log("*** Updating Itinerary ");
            console.log(updateDetails["memberID"]);
            console.log(updateDetails["details"]);
            var memberID = updateDetails.memberID;
            var updateData = {
                user_id: this.userID,
                visited: true,
                member_id: memberID,
                rating: updateDetails.details.rating,
                comment: updateDetails.details.comment,
            };
            console.log(updateData);
            for (var i = 0; i < this.itinerary.length; i++) {
                // find mathcing ...
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
                            }
                        });
                }
            }
            this.loadItinerary();
        },
    },
};
</script>

<style src='@/assets/css/p2.css'></style>


<style>
[v-cloak] {
    display: none;
}

#app {
    font-family: Helvetica, Arial, sans-serif;
}
</style>
