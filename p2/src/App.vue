<template>
    <div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <h2>Page</h2>
        <nav>
            <ul>
                <li>
                    <router-link
                        v-for="link in links"
                        v-bind:key="link"
                        v-bind:to="paths[link]"
                        >{{ link }}
                    </router-link>
                </li>
            </ul>
        </nav>
        <!-- Show the routed component -->
        <router-view v-bind:artistData="artistData"> </router-view>

        {{ artistList }}
    </div>
</template>
<script>

import  artistData  from '@/common/all_artists_2021.json';


export default {
    name: "App",
    data() {
        return {
            artistData: artistData,
            links: ["Home", "Browse Artists"],
            /* Map links to  the appropriate component */
            paths: {
                Home: "/",
                "Browse Artists": "/browse-artists",
            },
        };
    },
};
</script>

<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
}
</style>
