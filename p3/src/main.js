import { createApp } from 'vue'




//import { store as itinerary } from '@/common/itinerary.js'
import { store } from '@/common/itinerary.js'
import App from './App.vue'
import { router } from "@/common/routes.js";


createApp(App).use(router).use(store).mount('#app');