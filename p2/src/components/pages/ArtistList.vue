<template>
    <div id="artist-list">
        <h2>Somerville Open Studios SPA</h2>
        <p>List of Current Artists</p>

        <h3>Medium</h3>

        <input
            type="checkbox"
            id="BooksPaper"
            value="Books+Paper"
            v-model="checkedGenres"
        />
        <label for="BooksPaper"> Books + Paper </label>

        <input
            type="checkbox"
            id="Collage"
            value="Collage"
            v-model="checkedGenres"
        />
        <label for="Collage"> Collage </label>

        <input
            type="checkbox"
            id="Drawing"
            value="Drawing"
            v-model="checkedGenres"
        />
        <label for="Drawing"> Drawing </label>

        <input
            type="checkbox"
            id="FiberTextiles"
            value="Fiber+Textiles"
            v-model="checkedGenres"
        />
        <label for="FiberTextiles"> Fiber + Textiles </label>

        <input
            type="checkbox"
            id="Furniture"
            value="Furniture"
            v-model="checkedGenres"
        />
        <label for="Furniture"> Furnitures</label>

        <input
            type="checkbox"
            id="GlassMosaics"
            value="Glass+Mosaics"
            v-model="checkedGenres"
        />
        <label for="GlassMosaics"> Glass + Mosaics</label>

        <input
            type="checkbox"
            id="GraphicDesign"
            value="GraphicDesign"
            v-model="checkedGenres"
        />
        <label for="GraphicDesign"> Graphic Design </label>

        <input
            type="checkbox"
            id="Installation"
            value="Installation"
            v-model="checkedGenres"
        />
        <label for="Installation"> Installation </label>

        <input
            type="checkbox"
            id="JewelryBeads"
            value="Jewelry+Beads"
            v-model="checkedGenres"
        />
        <label for="JewelryBeads"> Jewelry + Beads </label>

        <input
            type="checkbox"
            id="Mixed-Media"
            value="Mixed-Media"
            v-model="checkedGenres"
        />
        <label for="Mixed-Media"> Mixed-Media </label>

        <input
            type="checkbox"
            id="Painting"
            value="Painting"
            v-model="checkedGenres"
        />
        <label for="Painting"> Painting </label>

        <input
            type="checkbox"
            id="Photography"
            value="Photography"
            v-model="checkedGenres"
        />
        <label for="Photography"> Photography </label>

        <input
            type="checkbox"
            id="Pottery"
            value="Pottery"
            v-model="checkedGenres"
        />
        <label for="Pottery"> Pottery </label>

        <input
            type="checkbox"
            id="Printmaking"
            value="Printmaking"
            v-model="checkedGenres"
        />
        <label for="Printmaking"> Printmaking </label>

        <input
            type="checkbox"
            id="Sculpture"
            value="Sculpture"
            v-model="checkedGenres"
        />
        <label for="Sculpture"> Sculpture </label>

        <input
            type="checkbox"
            id="Video"
            value="Video"
            v-model="checkedGenres"
        />
        <label for="Video"> Video </label>

        <input
            type="checkbox"
            id="Other "
            value="Other "
            v-model="checkedGenres"
        />
        <label for="Other"> Other </label>

        <div id="searchSelection">
            {{ checkedGenres }}
        </div>

        <h2>List counts</h2>
        Total Artists :{{ artistCount }}

        <button v-on:click="$emit('add-to-itinerary', artistCount)">
            Emit to add to itinerary
        </button>
        <ul>
            <li
                v-for="message in messages"
                v-bind:to="message"
                v-bind:key="message"
            >
                {{ message }}
            </li>
        </ul>

        <artist-grid
            v-on:add-to-itinerary="addToItinerary($event)"
            v-on:remove-from-itinerary="removeFromItinerary($event)"
            v-bind:artistList="filteredList"
            v-bind:imgBaseUrl="imageBaseUrl"
            v-bind:itineraryDetails="itineraryDetails"
        >
        </artist-grid>
    </div>
</template>

<script>
import ArtistGrid from "@/components/ArtistGrid.vue";

export default {
    data() {
        return {
            checkedGenres: ["Video"],
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

        // get the array of all artists
        artistList() {
            return this.artistData.artist_data;
        },

        // list of artists filtered by Genres (based on checkboxes)
        filteredList() {
            if (this.checkedGenres.length == 0) {
                console.log("NONE Checeked");

                return [];
            } else {
                var filtered = [];
                for (var i = 0; i < this.artistList.length; i++) {
                    var found = this.artistList[i]["genres_array"].some(
                        (r) => this.checkedGenres.indexOf(r) >= 0
                    );

                    if (found) {
                        console.log(
                            "found " +
                                this.artistData.artist_data[i]["member_id"]
                        );
                        filtered.push(this.artistData.artist_data[i]);
                    }
                }
                return filtered;
            }
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

    components: {
        "artist-grid": ArtistGrid,
    },
};
</script>

<style>
</style>