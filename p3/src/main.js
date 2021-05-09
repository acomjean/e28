import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';


import HomePage from '@/components/pages/HomePage.vue';
import ArtistList from '@/components/pages/ArtistListPage.vue';
import Itinerary from '@/components/pages/ItineraryPage.vue';
import ItineraryTest from '@/components/pages/ItineraryPage2.vue';


//import { store as itinerary } from '@/common/itinerary.js'
import { store } from '@/common/itinerary.js'

import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/browse-artists', component: ArtistList, props: true },
        { path: '/itinerary', component: Itinerary, props: true },
        { path: '/itinerary_test', component: ItineraryTest, props: false },


    ]
});

createApp(App).use(router).use(store).mount('#app');