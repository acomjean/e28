<template>
    <div id="categories-page">
        <h2>Categories</h2>
        <ul class="clean-list">
            <li v-for="(category, id) in categories" v-bind:key="id">
                {{ category }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        products: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {};
    },
    computed: {
        categories() {
            console.log("this.products");
            console.log(this.products);
            /*            let categories = this.products.map((product) =>
                product.categories.split(",")
            );
*/
            let categoriesNotEmpty = this.products.map(
                (product) => product.categories
            );

            categoriesNotEmpty = categoriesNotEmpty.filter(function (el) {
                return el != null;
            });

            console.log("categoriesNotEmpty:");
            console.log(categoriesNotEmpty);

            let categories = categoriesNotEmpty.map((product) =>
                product.split(",")
            );

            let mergedCategories = [].concat.apply([], categories);

            // Return unique, sorted categories
            return [...new Set(mergedCategories)].sort();
        },
    },
};
</script>

<style>
</style>