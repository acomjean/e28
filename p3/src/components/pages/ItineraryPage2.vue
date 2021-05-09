<template>
    <div id="itinerary-page2" v-cloak>
        <h2>Visit Your Itinerary</h2>
        <p>userID {{ userID }}</p>
        <button v-on:click="addToItinerary()">
            <b> Add ✅️ </b>
        </button>
        <button v-on:click="removeFromItinerary()">
            <b> Remove X </b>
        </button>
        <hr />
        Itinerary Array: {{ itineraryArray }}
        <hr />
        Itinerary Array2: {{ itineraryArrayByMemberID }}
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },

    methods: {
        addToItinerary() {
            let member_id = 100;
            this.$store.dispatch("addToItinerary", member_id);
            //this.$emit("add-to-itinerary", memberID);
        },

        removeFromItinerary() {
            let member_id = 100;
            this.$store.dispatch("removeFromItinerary", member_id);
        },
    },

    computed: {
        userID() {
            return this.$store.state.user;
        },
        itineraryArray() {
            return this.$store.state.itineraryArray;
        },
        itineraryArrayByMemberID() {
            return this.$store.getters.itineraryByMemberID();
        },
    },

    mounted() {
        this.$store.dispatch("fetchItinerary");
    },

    props: {},
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