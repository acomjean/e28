import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import HomePage from '@/components/pages/HomePage.vue';
import ArtistList from '@/components/pages/ArtistList.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/browse-artists', component: ArtistList, props: true }
    ]
});

createApp(App).use(router).mount('#app');