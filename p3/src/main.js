import { createApp } from 'vue'




import { store } from '@/common/store.js'
import App from './App.vue'
import { router } from "@/common/routes.js";


createApp(App).use(router).use(store).mount('#app');