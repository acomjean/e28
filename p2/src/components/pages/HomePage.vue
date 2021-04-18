<template>
    <div id="home-page">
        <h2>Somerville Open Studios SPA</h2>
        <p>
            Single Page Application For Somerville Open Studios.
        </p>
    </div>
</template>

<script>
export default {
    props: {
        artists: {
            type: Array,
            default: null,
        },
    },
};
</script>

<style>
</style>