
import { createRouter, createWebHistory } from 'vue-router';
import { store } from '@/common/itinerary.js';


import HomePage from '@/components/pages/HomePage.vue';
import ArtistList from '@/components/pages/ArtistListPage.vue';
import Itinerary from '@/components/pages/ItineraryPage.vue';
import ItineraryTest from '@/components/pages/ItineraryPage2.vue';
import Login from '@/components/pages/LoginPage.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/browse-artists', component: ArtistList, props: true },
        {
            path: '/itinerary', component: Itinerary, meta: {
                requiresAuth: true
            },
            props: true
        },
        { path: '/itinerary_test', component: ItineraryTest, props: false },
        { path: '/login', component: Login, props: false },
        { path: '/create_account', component: ItineraryTest, props: false },
        { path: '/denied', component: ItineraryTest, props: false },
        {
            path: '/new_login',
            component: () => import('@/components/pages/LoginNewPage.vue'),
        },
    ]
});

// FROM Zipfoods example.  
// The latest which waits for user to be set by VUEX before approving of denying a page.

// beforeEach provides a way to execute some code before a route is resolved
// Ref: https://router.vuejs.org/guide/advanced/navigation-guards.html
router.beforeEach(async (to) => {

    // Exact the meta information from our routes
    // Ref: https://router.vuejs.org/guide/advanced/meta.html#route-meta-fields
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);


    // Build a method to determine what do when we have a user

    const decide = (user) => {
        if (requiresAuth && !user) {
            // If they’re trying to access a requiresAuth route and they’re not logged in, 
            // they get sent to “Access Denied” page
            return '/denied';
        } else {
            // Otherwise, allow them to intended destination
            return true;
        }
    }

    // If we don’t have the user yet, dispatch our Vuex authUser action

    if (store.state.user === null) {
        let authUser = await store.dispatch('authUser');
        if (authUser !== null) {
            return decide(store.state.user);
        }
    } else {
        return decide(store.state.user);
    }
});

export { router };
