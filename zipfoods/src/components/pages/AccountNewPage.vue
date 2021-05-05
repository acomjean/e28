<template>
    <div>
        <h2>Sign Up for an Account</h2>

        <small class="form-help">All fields are required</small>

        <div id="inputs">
            <label for="name">Name</label>
            <input
                type="text"
                v-model="user.name"
                id="name"
                data-test="user-name-input"
            />
            <small class="form-help">Your Name</small>
            <error-field
                v-if="errors && 'name' in errors"
                v-bind:errors="errors.name"
            ></error-field>

            <label for="email">email:</label>
            <input
                type="text"
                v-model="user.email"
                id="email"
                data-test="user-email-input"
            />
            <small class="form-help">email address</small>
            <error-field
                v-if="errors && 'email' in errors"
                v-bind:errors="errors.email"
            ></error-field>

            <label for="password">password:</label>
            <input
                type="text"
                v-model="user.password"
                id="password"
                data-test="user-password-input"
            />
            <small class="form-help"> </small>
            <error-field
                v-if="errors && 'password' in errors"
                v-bind:errors="errors.password"
            ></error-field>

            <button v-on:click="adduser" data-test="add-user-button">
                Add user
            </button>

            <div class="form-feedback-error" v-if="errors">
                Please correct the above errors
            </div>

            <transition name="fade">
                <div
                    class="alert"
                    v-if="showConfirmation"
                    data-test="user-added-confirmation"
                >
                    Your user was added
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { axios } from "@/common/app.js";
import ErrorField from "@/components/ErrorField.vue";

export default {
    components: {
        "error-field": ErrorField,
    },
    data() {
        return {
            showConfirmation: false,
            errors: null,
            user: {
                name: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        adduser() {
            axios.post("/register", this.user).then((response) => {
                if (response.data.errors) {
                    this.errors = response.data.errors;
                    this.showConfirmation = false;
                } else {
                    this.user = {
                        name: "",
                        email: "",
                        password: "",
                    };

                    this.$emit("update-users");
                    this.showConfirmation = true;

                    // Fade out confirmation after 3 seconds
                    setTimeout(() => (this.showConfirmation = false), 3000);
                }
            });
        },
    },
};
</script>

<style scoped>
#inputs {
    text-align: left;
}

textarea {
    height: 100px;
}

button {
    margin-bottom: 10px;
}
</style>