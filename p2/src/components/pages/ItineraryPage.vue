<template>
    <div id="itinerary-page" v-cloak>
        <h2>Visit Your Itinerary</h2>
        <p></p>

        <div v-if="itineraryDetails.length == 0">
            <p>
                <b> you have no artists in your itinerary</b> go the the Browse
                Artists Page to add some
            </p>
        </div>

        <div v-if="itineraryDetails.length > 0">
            <div class="artist-panel" v-if="showArtistPanel == true">
                <artist-slideshow
                    v-bind:one-artist-detail="currentArtist"
                    v-bind:img-base-url="imageBaseUrl"
                >
                </artist-slideshow>

                <hr />
                <div v-if="showForm">
                    <p>
                        <br />
                        Add a comment (optional)
                        <br />
                        <input
                            type="hidden"
                            v-model="itineraryUpdateDetails.rating"
                            id="rating"
                        />

                        <label for="comment">Comment</label>
                        <textarea
                            style="width: 200px; height: 50px"
                            v-model.lazy="itineraryUpdateDetails.comment"
                            id="comment"
                        ></textarea>
                    </p>

                    <p>
                        <br />
                        <button
                            class="select-button"
                            v-on:click="updateItinerary('add')"
                        >
                            Save/ Close
                        </button>
                        <button
                            class="select-button"
                            v-on:click="updateItinerary"
                        >
                            Save/ Visit Next
                        </button>
                    </p>
                </div>

                <div v-else>
                    <h4>Previous Visit</h4>

                    <p>
                        <b>Comment:</b>
                        {{
                            itineraryDetailsById[currentArtist.member_id]
                                .comment
                        }}
                    </p>
                    <button
                        class="select-button"
                        v-on:click="updateItinerary('remove')"
                    >
                        UnVisit
                    </button>
                </div>
            </div>

            <hr />

            <div class="itin-container">
                <div class="itin-item">
                    <h3>Artists To Visit</h3>
                    <div v-if="artistsToVisit.length == 0">
                        <b>
                            You have no Artists in you Itinerary.<br />
                            <button class="select-button">
                                <router-link to="/browse-artists">
                                    Go Browse the Artists to add some
                                </router-link>
                            </button>
                        </b>
                    </div>
                    <ul class="">
                        <li
                            class="artist-v-list"
                            v-for="oneArtist in artistsToVisit"
                            v-bind:key="oneArtist.id"
                        >
                            <div>
                                {{
                                    artistsObject[oneArtist.member_id]
                                        .PublicFirstName
                                }}
                                {{
                                    artistsObject[oneArtist.member_id]
                                        .PublicLastName
                                }}
                            </div>
                            <div>
                                <button
                                    v-on:click="showArtist(oneArtist.member_id)"
                                    class="select-button"
                                >
                                    View Artwork
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="itin-item">
                    <h3>Previously Visited</h3>
                    <li
                        class="artist-v-list"
                        v-for="oneArtist in artistsVisited"
                        v-bind:key="oneArtist.id"
                    >
                        <div>
                            <b>
                                {{
                                    artistsObject[oneArtist.member_id]
                                        .PublicFirstName
                                }}
                                {{
                                    artistsObject[oneArtist.member_id]
                                        .PublicLastName
                                }}<br />
                            </b>

                            <span
                                v-if="
                                    itineraryDetailsById[oneArtist.member_id]
                                        .comment != null
                                "
                            >
                                Comment:

                                {{
                                    itineraryDetailsById[oneArtist.member_id]
                                        .comment
                                }}
                            </span>
                        </div>
                        <div>
                            <button
                                v-on:click="
                                    showArtistNoForm(oneArtist.member_id)
                                "
                                class="select-button"
                            >
                                View Artwork
                            </button>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArtistSlideshow from "@/components/ArtistSlideshow.vue";

export default {
    components: { ArtistSlideshow },
    data() {
        return {
            showArtistPanel: false,
            showForm: false,
            currentArtist: {},
            itineraryUpdateDetails: { comment: "", rating: "" },
            errors: null,
        };
    },

    methods: {
        // pass on up to parent
        addToItinerary(member_id) {
            this.$emit("add-to-itinerary", member_id);
        },

        // pass on up to parent
        removeFromItinerary(member_id) {
            this.$emit("remove-from-itinerary", member_id);
        },

        // show the artists mini -statement and images - and form to fill out.
        showArtist(member_id) {
            this.showArtistPanel = true;
            this.showForm = true;
            this.currentArtist = this.artistsObject[member_id];
        },

        // show the artists mini -statement and images
        showArtistNoForm(member_id) {
            this.showArtistPanel = true;
            this.showForm = false;
            this.currentArtist = this.artistsObject[member_id];
        },

        // Save information on form
        updateItinerary(visited) {
            var memberID = this.currentArtist["member_id"];

            var localVisit = true;
            var localDetails = this.itineraryUpdateDetails;
            if (visited == "remove") {
                localVisit = false;
                localDetails = { comment: "", rating: "" };
            }
            this.$emit("update-itinerary", {
                memberID: memberID,
                visited: localVisit,
                details: localDetails,
            });

            this.showArtistPanel = false;
        },
    },

    computed: {
        artistsToVisit() {
            return this.itineraryDetails.filter((itin) => itin.visited == "0");
        },

        artistsVisited() {
            return this.itineraryDetails.filter((itin) => itin.visited == "1");
        },

        // get the array of all artists
        artistList() {
            return this.artistData.artist_data;
        },

        // artists, indexed by the member ID

        artistsObject() {
            var filtered = {};
            // generate a object where the key is the artists member_id
            // saves lots of looping later.
            for (var i = 0; i < this.artistList.length; i++) {
                var memberID = this.artistList[i]["member_id"];
                filtered[memberID] = this.artistList[i];
            }

            return filtered;
        },
    },

    props: {
        artistData: {
            type: Object,
            default: null,
        },
        itineraryDetails: {
            type: Array,
        },
        itineraryDetailsById: {
            type: Object,
        },
        messages: {
            type: Array,
        },
        imageBaseUrl: {
            type: String,
        },
    },
};
</script>

<style>
[v-cloak] {
    display: none;
}

.itin-container {
    display: flex;
}
.itin-item {
    width: 50%;
    flex-basis: 1;
    margin: 10px;
}
.artist-v-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid lightgray;
}
</style>