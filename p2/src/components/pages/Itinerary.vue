<template>
    <div id="itinerary-page">
        <h2>Itinerary List</h2>
        <p></p>

        <div v-if='itineraryDetails.length==0'>
            <p><b> you have no artists in your itinerary</b> go the the Browse Artists Page to add some</p>
            </div>
    </div>
</template>

<script>
export default {
    props: {
        itineraryDetails: {
            type: Array,
            default: null,
        },
    },
};
</script>

<style>
</style>