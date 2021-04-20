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
            <div class="itin-container">
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
export default {
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
    },
};
</script>

<style>
[v-cloak] {
    display: none !important;
}

.itin-container {
    display: flex;
}
.itin-item {
    width: 50%;
    flex-basis: 1;
}
</style>