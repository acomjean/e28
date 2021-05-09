<template>
    <div id="itinerary-page2" v-cloak>
        <h2>Visit Your Itinerary</h2>
        <p>userID {{ userID }}</p>

        Itinerary Array: {{ itineraryArray }}
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },

    computed: {
        userID() {
            return this.$store.state.user;
        },
        itineraryArray() {
            return this.$store.state.itineraryArray;
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