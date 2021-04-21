<template>
    <div id="itinerary-page" v-cloak>
        <h2>Itinerary List</h2>
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
                    v-bind:imgBaseUrl="imageBaseUrl"
                >
                </artist-slideshow>
                <hr />

                <label for="rating"
                    >Rating (out of 5):
                    <span v-if="errors && errors.rating"> * </span>
                </label>
                <input
                    type="number"
                    v-model="itineraryUpdateDetails.rating"
                    id="price"
                />
                <input
                    type="hidden"
                    v-model="itineraryUpdateDetails.visited"
                    id="visited"
                />
                <label for="comment">Description</label>
                <textarea
                    v-model.lazy="itineraryUpdateDetails.comment"
                    id="comment"
                ></textarea>

                <button v-on:click="updateItinerary">Complete Visit</button>
            </div>

            <div class="itin-container">
                <hr />
                <div class="itin-item">
                    <ul>
                        <h3>To Visit</h3>
                        <li
                            class="oneCard"
                            v-for="oneArtist in artistsToVisit"
                            v-bind:key="oneArtist.id"
                        >
                            {{
                                artistsObject[oneArtist.member_id]
                                    .PublicFirstName
                            }}
                            {{
                                artistsObject[oneArtist.member_id]
                                    .PublicLastName
                            }}
                            <button
                                v-on:click="showArtist(oneArtist.member_id)"
                                class="select-button"
                            >
                                Visit Artist
                            </button>
                        </li>
                    </ul>
                </div>

                <div class="itin-item">
                    <h3>Visited</h3>
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
            currentArtist: {},
            itineraryUpdateDetails: { detail: "", comment: "", rating: "" },
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

        showArtist(member_id) {
            this.showArtistPanel = true;
            this.currentArtist = this.artistsObject[member_id];
        },

        // pass on up to parent
        updateItinerary() {
            var memberID = this.currentArtist["member_id"];
            console.log("+------------+");
            console.log(this.itineraryUpdateDetails);
            this.$emit("update-itinerary", {
                memberID: memberID,
                details: this.itineraryUpdateDetails,
            });
        },
    },

    computed: {
        // returns an object of artists :
        //['visited'] : list of artist
        //['toVisit'] : list of artists reviewed.

        artistsToVisit() {
            return this.itineraryDetails;
        },
        artistsVisited() {
            return this.itineraryDetails;
        },

        // get the array of all artists
        artistList() {
            return this.artistData.artist_data;
        },

        // artists, indexed by the member ID
        artistsObject() {
            console.log("artists Object");
            var filtered = {};
            // generate a object where the key is the artists member_id
            // saves lots of looping later.
            for (var i = 0; i < this.artistList.length; i++) {
                var memberID = this.artistList[i]["member_id"];
                filtered[memberID] = this.artistList[i];
            }
            console.log("filtered");
            console.log(filtered);
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
}
.select-button {
    font: "Permanent Marker";
    margin: 10px;
    padding: 0.85em 1em;
    padding-top: 0.7em;
    padding-right: 1em;
    padding-bottom: 0.7em;
    padding-left: 1em;
    border: 1px solid black;
    transition: background-color 0.25s ease-out, color 0.25s ease-out;
    border-radius: 5px;
    background-color: #b1b1bb;
    color: hsl(240, 78%, 2%);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}
.select-button:hover {
    font: "Permanent Marker";
    margin: 10px;
    padding: 0.85em 1em;
    padding-top: 0.7em;
    padding-right: 1em;
    padding-bottom: 0.7em;
    padding-left: 1em;
    border: 1px solid black;
    transition: background-color 0.25s ease-out, color 0.25s ease-out;
    border-radius: 5px;
    background-color: #d5d5e6;
    color: hsl(240, 78%, 2%);
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}
</style>