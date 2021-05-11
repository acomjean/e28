<template>
    <div id="artist-grid">
        <div v-if="artistList.length > 0">
            <button v-on:click="shuffleIndex">
                shuffle {{ artistList.length }} Artists
            </button>
        </div>
        <ul class="thumb_container">
            <li v-for="i in artistIndexes" v-bind:key="artistIndexes[i]">
                <div class="artistcard" data-test="artistcard">
                    <img
                        :src="getPic(artistList[i])"
                        v-bind:alt="artistList[i].PublicLastName"
                        height="170"
                        width="170"
                    />

                    {{ artistList[i].member_id }}
                    {{ artistList[i].PublicFirstName }}
                    {{ artistList[i].PublicLastName }}
                    <div v-if="userData">
                        <div v-if="checkIfInItinerary(artistList[i].member_id)">
                            <div v-if="checkIfVisited(artistList[i].member_id)">
                                <div
                                    v-if="
                                        itineraryDetailsById[
                                            artistList[i].member_id
                                        ].rating == null
                                    "
                                >
                                    Visited
                                </div>
                                <div v-else>
                                    Rating :
                                    {{
                                        itineraryDetailsById[
                                            artistList[i].member_id
                                        ].rating
                                    }}
                                </div>
                            </div>
                            <div v-else>
                                <button
                                    v-on:click="
                                        removeFromItinerary(
                                            artistList[i].member_id
                                        )
                                    "
                                >
                                    <b> Remove ❌ </b>
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <button
                                v-on:click="
                                    addToItinerary(artistList[i].member_id)
                                "
                            >
                                <b> Add ✅️ </b>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        // load picture (just setting the atr with vue will not work)
        getPic(artistData) {
            return (
                this.imgBaseUrl +
                "/" +
                artistData["thumb_data"]["filename_and_path"]
            );
        },

        addToItinerary(memberID) {
            this.$store.dispatch("addToItinerary", memberID);
        },

        removeFromItinerary(memberID) {
            this.$store.dispatch("removeFromItinerary", memberID);
        },

        checkIfInItinerary(memberID) {
            return this.memberIdsOfItinerary.includes("" + memberID);
        },
        checkIfVisited(memberID) {
            if (
                this.itineraryDetailsById &&
                this.itineraryDetailsById[memberID]
            ) {
                if (this.itineraryDetailsById[memberID].visited == "1") {
                    return true;
                }
            }
            return false;
        },
        shuffleIndex() {
            this.artistIndexes = this.artistIndexes
                .map((a) => ({ sort: Math.random(), value: a }))
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value);
        },
    },

    computed: {
        userData() {
            return this.$store.state.userData;
        },

        memberIdsOfItinerary() {
            var filtered = [];
            for (var i = 0; i < this.itineraryDetails.length; i++) {
                filtered.push("" + this.itineraryDetails[i]["member_id"]);
            }
            return filtered;
        },

        itineraryDetails() {
            return this.$store.state.itineraryArray;
        },

        itineraryDetailsById() {
            return this.$store.getters.itineraryByMemberID();
        },
    },

    props: {
        artistList: {
            type: Array,
        },
        imgBaseUrl: {
            type: String,
        },
    },

    watch: {
        artistList: function () {
            // get list of indexes into an array
            this.artistIndexes = Array.from(
                Array(this.artistList.length).keys()
            );
        },
    },
    data() {
        return {
            artistIndexes: [],
        };
    },
};
</script>

<style scoped>
.thumb_container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 10px;
    list-style: none;
    margin: 0;
    padding: 2.2rem;
    background-color: #fcfcff;
}

.thumb_container li {
    font-size: 0.8em;
    margin: auto;
    background: white;
    padding: 10px 10px;
    border-radius: 30px 0 /0px 0px;
    box-shadow: 0px 1px 2px 1px #949393;
    min-height: 200px;
    min-width: 150px;
    max-width: 180px;

    border: 0px solid gray;
}
.thumb_container li img {
}
.artistcard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>