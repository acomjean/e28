<template>
    <div id="artist-list">
        <h2>Build An Itinerary</h2>
        <p>
            Browse through artists thumbnails. If you find some that look
            interesting, click the add.
        </p>
        <p>
            Once you've added some, you can view their art by going to the
            Itinerary Page
        </p>

        <h3>Select Mediums</h3>
        <div class="flex-container">
            <div class="flex-column">
                <input
                    type="checkbox"
                    id="BooksPaper"
                    value="Books+Paper"
                    v-model="checkedGenres"
                />
                <label for="BooksPaper"> Books + Paper </label>
                <br />
                <input
                    type="checkbox"
                    id="Collage"
                    value="Collage"
                    v-model="checkedGenres"
                />
                <label for="Collage"> Collage </label>
                <br />
                <input
                    type="checkbox"
                    id="Drawing"
                    value="Drawing"
                    v-model="checkedGenres"
                />
                <label for="Drawing"> Drawing </label>
                <br />
                <input
                    type="checkbox"
                    id="FiberTextiles"
                    value="Fiber+Textiles"
                    v-model="checkedGenres"
                />
                <label for="FiberTextiles"> Fiber + Textiles </label>
                <br />
                <input
                    type="checkbox"
                    id="Furniture"
                    value="Furniture"
                    v-model="checkedGenres"
                />

                <label for="Furniture"> Furnitures</label>
            </div>
            <div class="flex-column">
                <input
                    type="checkbox"
                    id="GlassMosaics"
                    value="Glass+Mosaics"
                    v-model="checkedGenres"
                />
                <label for="GlassMosaics"> Glass + Mosaics</label>
                <br />
                <input
                    type="checkbox"
                    id="GraphicDesign"
                    value="GraphicDesign"
                    v-model="checkedGenres"
                />
                <label for="GraphicDesign"> Graphic Design </label>
                <br />
                <input
                    type="checkbox"
                    id="Installation"
                    value="Installation"
                    v-model="checkedGenres"
                />
                <label for="Installation"> Installation </label>
                <br />
                <input
                    type="checkbox"
                    id="JewelryBeads"
                    value="Jewelry+Beads"
                    v-model="checkedGenres"
                />
                <label for="JewelryBeads"> Jewelry + Beads </label>
                <br />
                <input
                    type="checkbox"
                    id="Mixed-Media"
                    value="Mixed-Media"
                    v-model="checkedGenres"
                />
                <label for="Mixed-Media"> Mixed-Media </label>
            </div>
            <div class="flex-column">
                <input
                    type="checkbox"
                    id="Painting"
                    value="Painting"
                    v-model="checkedGenres"
                />
                <label for="Painting"> Painting </label>
                <br />
                <input
                    type="checkbox"
                    id="Photography"
                    value="Photography"
                    v-model="checkedGenres"
                />
                <label for="Photography"> Photography </label>
                <br />
                <input
                    type="checkbox"
                    id="Pottery"
                    value="Pottery"
                    v-model="checkedGenres"
                />
                <label for="Pottery"> Pottery </label>
                <br />
                <input
                    type="checkbox"
                    id="Printmaking"
                    value="Printmaking"
                    v-model="checkedGenres"
                />
                <label for="Printmaking"> Printmaking </label>
                <br />
                <input
                    type="checkbox"
                    id="Sculpture"
                    value="Sculpture"
                    v-model="checkedGenres"
                />
                <label for="Sculpture"> Sculpture </label>
                <br />
                <input
                    type="checkbox"
                    id="Video"
                    value="Video"
                    v-model="checkedGenres"
                />
                <label for="Video"> Video </label>
            </div>
        </div>
        <div v-if="checkedGenres.length == 0" class="info">
            <b> Pelect some mediums above</b>
        </div>

        <h4>List counts</h4>
        <div class="flex-container">
            <div class="flex-column">
                <p>
                    Total Artists :{{ artistCount }}<br />
                    Artists In Your Itinerary: {{ itineraryDetails.length
                    }}<br />
                    Artists in itinerary not visited: {{ artistsToVisit.length
                    }}<br />
                </p>
            </div>
            <div class="flex-column">
                <div v-if="itineraryDetails.length > 0">
                    You can virtually visit artists in your Itinerary <br />
                    <button class="select-button">
                        <router-link to="/itinerary">
                            Visit Artists In You Itinerary
                        </router-link>
                    </button>
                </div>
            </div>
        </div>
        <artist-grid
            v-on:add-to-itinerary="addToItinerary($event)"
            v-on:remove-from-itinerary="removeFromItinerary($event)"
            v-bind:artistList="filteredList"
            v-bind:imgBaseUrl="imageBaseUrl"
            v-bind:itinerary-details="itineraryDetails"
            v-bind:itinerary-details-by-id="itineraryDetailsById"
        >
        </artist-grid>
    </div>
</template>

<script>
import ArtistGrid from "@/components/ArtistGrid.vue";

export default {
    data() {
        return {
            checkedGenres: [],
        };
    },
    methods: {
        // pass on up to parent
        addToItinerary(memberID) {
            this.$emit("add-to-itinerary", memberID);
        },

        // pass on up to parent
        removeFromItinerary(memberID) {
            this.$emit("remove-from-itinerary", memberID);
        },
    },

    computed: {
        // Get the results of the last gamed played.
        artistCount() {
            if (this.artistList.length > 0) {
                return this.artistList.length;
            } else {
                return null;
            }
        },

        // count of artists to visit
        artistsToVisit() {
            return this.itineraryDetails.filter((itin) => itin.visited == "0");
        },

        // get the array of all artists
        artistList() {
            return this.artistData.artist_data;
        },

        // list of artists filtered by Genres (based on checkboxes)
        filteredList() {
            if (this.checkedGenres.length == 0) {
                return [];
            } else {
                var filtered = [];
                for (var i = 0; i < this.artistList.length; i++) {
                    var found = this.artistList[i]["genres_array"].some(
                        (r) => this.checkedGenres.indexOf(r) >= 0
                    );

                    if (found) {
                        filtered.push(this.artistData.artist_data[i]);
                    }
                }
                return filtered;
            }
        },

        itineraryDetails() {
            return this.$store.state.itineraryArray;
        },

        itineraryDetailsById() {
            return this.$store.getters.itineraryByMemberID();
        },
    },

    props: {
        artistData: {
            type: Object,
            default: null,
        },
        messages: {
            type: Array,
        },
        imageBaseUrl: {
            type: String,
        },
    },

    components: {
        "artist-grid": ArtistGrid,
    },
};
</script>

<style scoped>
.flex-container {
    display: flex;
    width: 100%;
}

.flex-column {
    flex: 1;
}

.warning {
    background: rgba(244, 215, 201, 0.37);
    color: #d93025;
    border-color: #d93025;
}
.info {
    background: rgba(186, 208, 228, 0.37);
    color: #00539f;
    border-color: #00539f;
}
</style>