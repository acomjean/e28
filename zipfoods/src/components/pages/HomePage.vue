<template>
    <div id="home-page">
        <p>
            ZipFoods !
        </p>

        <show-featured v-bind:category="'snacks'"></show-featured>
    </div>
</template>

<script>
import ShowFeatured from "@/components/ShowFeatured.vue";
export default {
    components: {
        "show-featured": ShowFeatured,
    },
};
</script>

<style>
</style>