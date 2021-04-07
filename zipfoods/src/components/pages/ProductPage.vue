<template>
    <div id="product-page">
        <h1>Product: {{ id }}</h1>

        <div v-if='foundIndex == null'> None Found  </div>
        <div v-else>
<show-product
                v-bind:key="foundIndex"
                v-bind:product="products[foundIndex]"
            ></show-product>
        </div>

    </div>
</template>

<script>

import ShowProduct from "@/components/ShowProduct.vue";

import { products } from "@/common/products.js";

console.log (products)

export default {
    components: {
        "show-product": ShowProduct,
    },

    computed: {
        foundIndex(){
            let foundIndexl = null;
            for (let i = 0; i < products.length; i++) {
                    if (products[i]['id']==this.id){
                        console.log ("found i" + i);
                        return i;
                    }
                }
            console.log("index" + foundIndexl);
            return foundIndexl;
        },   
    },


    props: {
        id: {
            type: String,
        },
    },
     data(){
        return{
                products: products
                
                }
        }

};
</script>

<style>
</style>