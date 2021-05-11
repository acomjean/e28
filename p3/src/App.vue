<template>
    <div v-cloak>
        <!--
            <img alt="Vue logo" src="./assets/logo.png" />
        -->
        <h1>Art Browser - Somerville Open Studios 2021</h1>
        <nav class="sosnav">
            <ul>
                <li>
                    <router-link
                        v-for="link in links"
                        v-bind:key="link"
                        v-bind:to="paths[link]"
                        >{{ link }}
                    </router-link>
                </li>
                <li style="padding-left: 20px" v-if="userData">
                    User: {{ userData.name }}
                </li>
                <li v-else>Not Logged In</li>
            </ul>
        </nav>
        <hr />

        <router-view v-bind:messages="messages"> </router-view>
    </div>
</template>
<script>
//import { axios } from "@/common/app.js";

export default {
    name: "App",

    data() {
        return {
            messages: [],
            links: [
                "Home",
                "Browse Artists",
                "Itinerary",
                "Login",
                "New Account",
            ],
            /* Map links to  the appropriate component */
            paths: {
                Home: "/",
                "Browse Artists": "/browse-artists",
                Itinerary: "/itinerary",
                Login: "/login",
                "New Account": "/new-login",
            },
        };
    },

    computed: {
        userData() {
            return this.$store.state.userData;
        },
    },
    mounted() {
        this.loadItinerary();
    },

    methods: {
        loadItinerary() {
            this.$store.dispatch("fetchItinerary");
        },
        clearMessages() {
            this.messages = [];
        },
    },
};
</script>

// Were p3 now.. but the style carries over.
<style src='@/assets/css/p2.css'></style>

<style>
[v-cloak] {
    display: none;
}

/* From zipfoods example for navigation header */

nav ul {
    list-style-type: none;
}

nav ul li {
    display: inline-block;
}

.sosnav {
    color: blue;
    padding-left: 5px;
    margin-left: 5px;
}
.sosnav li {
    color: black;
}

.sosnav li a {
    padding-left: 15px;
    margin-left: 15px;
    color: darkblue;
}

ul li a:link,
a:visited,
a:hover,
a:active {
    /* Ref: https://stackoverflow.com/a/49783868 for why inline-block is added */
    text-transform: capitalize;
    margin: 5px;
    cursor: pointer;
    font-weight: bold;
}

ul li a.router-link-active:link,
a.router-link-active:active {
    margin: 5px;
    text-decoration: none;
    color: red;
    background-color: papayawhip;
    cursor: inherit;
}
</style>
