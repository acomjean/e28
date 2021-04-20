<template>
    <div id="artist-list">
        <h2>Artist List</h2>
        <ul class="thumb_container">
            <li
                v-for="oneArtist in artistList"
                v-bind:key="oneArtist.member_id"
            >
                <div class="artistcard">
                    <img
                        :src="getPic(oneArtist)"
                        v-bind:alt="oneArtist.PublicLastName"
                        height="170"
                        width="170"
                    />
                    <p>
                        {{ oneArtist.member_id }}
                        {{ oneArtist.PublicFirstName }}
                        {{ oneArtist.PublicLastName }}
                    </p>

                    <div v-if="checkIfInItinerary(oneArtist.member_id)">
                        <button
                            v-on:click="
                                removeFromItinerary(oneArtist.member_id)
                            "
                        >
                            <b> Remove ❌ </b>
                        </button>
                    </div>
                    <div v-else>
                        <button
                            v-on:click="addToItinerary(oneArtist.member_id)"
                        >
                            <b> Add ✅️ </b>
                        </button>
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
            console.log(artistData);
            return (
                this.imgBaseUrl +
                "/" +
                artistData["thumb_data"]["filename_and_path"]
            );
        },

        addToItinerary(memberID) {
            console.log("component call");
            this.$emit("add-to-itinerary", memberID);
        },

        removeFromItinerary(memberID) {
            console.log("component call");
            this.$emit("remove-from-itinerary", memberID);
        },

        checkIfInItinerary(memberID) {
            console.log("checking " + memberID);
            console.log(this.memberIdsOfItinerary);
            var x = this.memberIdsOfItinerary.includes("" + memberID);
            console.log(x);
            return x;
        },
    },

    computed: {
        memberIdsOfItinerary() {
            var filtered = [];
            for (var i = 0; i < this.itineraryDetails.length; i++) {
                filtered.push("" + this.itineraryDetails[i]["member_id"]);
            }
            return filtered;
        },
    },

    props: {
        artistList: {
            type: Array,
        },
        imgBaseUrl: {
            type: String,
        },
        itineraryDetails: {
            type: Array,
        },
    },
    data() {
        return {};
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
    font-size: 0.9em;
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
    margin: auto;
}
.artistcard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>