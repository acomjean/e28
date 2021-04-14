<template>
    <div>
        <h2>Add a Product {{id}}</h2>

        <div id="inputs">
            <label for="name">
                <span v-if="errors && errors.name"> * </span>
            </label>
            <input type="text" v-model="product.name" id="name" />

            <label for="sku"
                >SKU:
                <span v-if="errors && errors.sku"> * </span>
            </label>
            <input type="text" v-model="product.sku" id="sku" />

            <label for="price"
                >Price:
                <span v-if="errors && errors.price"> * </span>
            </label>
            <input type="text" v-model="product.price" id="price" />

            <label for="available"
                >Quantity available:
                <span v-if="errors && errors.available"> * </span>
            </label>
            <input type="text" v-model="product.available" id="available" />

            <label for="weight"
                >Weight (in lbs):
                <span v-if="errors && errors.weight"> * </span>
            </label>
            <input type="text" v-model="product.weight" id="weight" />

            <label for="perishable" class="form-checkbox-label">
                <input
                    type="checkbox"
                    v-model="product.perishable"
                    id="perishable"
                />
                Perishable?
            </label>

            <label for="description">Description</label>
            <textarea v-model="product.description" id="description"></textarea>
        </div>

        <button v-on:click="addProduct">Add Product</button>

        <div v-if="showConfirmation">Your product was added</div>

        <div v-if="errors">
            There were errors
            <ul>
                <li
                    v-for="(oneError, field) in errors"
                    v-bind:to="oneError"
                    v-bind:key="field"
                >
                    {{ field }}
                    <ul>
                        <li
                            v-for="errorText in oneError"
                            v-bind:to="errorText"
                            v-bind:key="errorText"
                        >
                            {{ errorText }}
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { axios } from "@/common/app.js";
export default {
    props: {
        id: {
            type: String,
        },
        products: {
            type: Array,
            default: null,
        },
    },

    data() {
        return {
            showConfirmation: false,
            errors: null,
        };
    },
    methods: {
        addProduct() {
            axios.put("/product/"+this.id, this.product).then((response) => {
                if (response.data.errors) {
                    this.errors = response.data.errors;
                    this.showConfirmation = false;
                } else {
                    this.$emit("update-products");
                    this.showConfirmation = true;

                    // clear form messages
                    this.product.name = "";
                    this.product.sku = "";
                    this.product.price = "";
                    this.product.available = "";
                    this.product.weight = "";
                    this.product.perishable = false;
                    this.product.description = "";
                }
            });
        },
        mounted() {
            alert("mounted");
        },
    },
    computed: {
        product() {
            console.log("products-in edit");
            console.log(this.products);
            if (this.products && this.products[0]){
            return this.products.filter((product) => {
               return product.id == this.id;
            }, this.id)[0];
            }else {
                return [];
            }
        },
        productNotFound() {
            return this.product == null;
        },
    },
};
</script>

<style scoped>
#inputs {
    text-align: left;
    display: flex;
    flex-direction: column;
}
#inputs label {
    margin-top: 20px;
    background-color: white;
}

#inputs label {
    background-color: rgb(216, 216, 216);
}
</style>