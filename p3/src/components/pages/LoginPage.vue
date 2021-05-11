<!-- Login modified from Zip Foods example -->

<template>
    <div id="login-page">
        <div v-if="userData">
            <h2>Welcome, {{ userData.name }}!</h2>

            <p>Your account is active.</p>

            <ul>
                <li>
                    <router-link to="/browse-artists">
                        Browse Artists to Add artists to you itinerary.
                    </router-link>
                </li>

                <li v-if="itineraryDetails.length > 0">
                    <router-link to="/itinerary">
                        Visit Artists in your itinerary (currently
                        {{ itineraryDetails.length }})
                    </router-link>
                </li>
            </ul>

            <p>OR</p>

            <button v-on:click="logout" data-test="logout-button">
                Logout
            </button>
        </div>

        <div v-else id="loginForm">
            <h2>Login</h2>
            <small>
                (Form is prefilled for demonstration purposes; remove in final
                application)
            </small>
            <div>
                <label>
                    Email:
                    <input
                        type="text"
                        v-model="data.email"
                        data-test="email-input"
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        v-model="data.password"
                        data-test="password-input"
                    />
                </label>
            </div>

            <button v-on:click="login" data-test="login-button">Login</button>

            <ul v-if="errors">
                <li class="error" v-for="(error, index) in errors" :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { axios } from "@/common/app.js";

export default {
    data() {
        return {
            // Form is prefilled for demonstration purposes; remove in final application
            // jill@harvard.edu/asdfasdf is one of our seed users from e28api/seeds/user.json
            data: {
                email: "jill@harvard.edu",
                password: "asdfasdf",
            },
            errors: null,
            favorites: [],
        };
    },
    computed: {
        userData() {
            return this.$store.state.userData;
        },
        itineraryDetails() {
            return this.$store.state.itineraryArray;
        },
    },
    methods: {
        login() {
            axios.post("login", this.data).then((response) => {
                if (response.data.authenticated) {
                    this.$store.commit("setUser", response.data.user);
                    this.$store.dispatch("fetchItinerary");
                } else {
                    this.errors = response.data.errors;
                }
            });
        },
        logout() {
            axios.post("logout").then((response) => {
                if (response.data.success) {
                    this.$store.commit("setUser", false);
                }
            });
        },
    },
};
</script>


<style scoped>
button {
    margin-bottom: 15px;
    padding: 10px;
}
</style>