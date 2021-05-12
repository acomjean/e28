<!-- New User Page, From Zip Foods  with validator code added.-->

<template>
    <div>
        <h2>Create New Account</h2>

        <small class="form-help">All fields are required</small>

        <div id="inputs">
            <div>
                <label for="name">Name</label>
                <input
                    type="text"
                    v-model="user.name"
                    id="name"
                    v-on:blur="validate"
                />
                <small class="form-help">Your Name</small>
                <error-field
                    v-if="errors && 'name' in errors"
                    v-bind:errors="errors.name"
                ></error-field>
            </div>
            <div>
                <label for="email">email:</label>
                <input
                    type="text"
                    v-model="user.email"
                    id="email"
                    v-on:blur="validate"
                />
                <small class="form-help">email address</small>
                <error-field
                    v-if="errors && 'email' in errors"
                    v-bind:errors="errors.email"
                ></error-field>
            </div>
            <div>
                <label for="password">password:</label>
                <input
                    type="password"
                    v-model="user.password"
                    id="password"
                    v-on:blur="validate"
                />
                <small class="form-help"> </small>
                <error-field
                    v-if="errors && 'password' in errors"
                    v-bind:errors="errors.password"
                ></error-field>
            </div>
            <div>
                <button v-on:click="adduser" data-test="add-user-button">
                    Create New User
                </button>
            </div>
            <div class="form-feedback-error" v-if="errors">
                Please correct the above errors
            </div>

            <div class="alert" v-if="showConfirmation">Your user was added</div>
        </div>
    </div>
</template>

<script>
import { axios } from "@/common/app.js";
import ErrorField from "@/components/ErrorField.vue";
import Validator from "validatorjs";

export default {
    components: {
        // Common component for server baser validation reporting
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
            // js validate before server side validation
            if (this.validate()) {
                // add user
                axios.post("/register", this.user).then((response) => {
                    // server side error handling
                    if (response.data.errors) {
                        this.errors = response.data.errors;
                        this.showConfirmation = false;
                    } else {
                        this.user = {
                            name: "",
                            email: "",
                            password: "",
                        };

                        this.showConfirmation = true;
                        this.errors = "";

                        // Fade out confirmation after 3 seconds
                        setTimeout(() => (this.showConfirmation = false), 5000);
                    }
                });
            }
        },

        validate() {
            let validator = new Validator(this.user, {
                name: "required|between:3,100",
                email: "required|email",
                password: "required|between:8,100",
            });

            if (validator.fails()) {
                this.errors = validator.errors.all();
            } else {
                this.errors = null;
            }

            return validator.passes();
        },
    },
};
</script>

<style scoped>
/* Stack input boxed */
#inputs {
    text-align: left;
    display: flex;
    flex-direction: column;
}
#inputs div {
    margin: 10px;
}
#inputs div label {
    margin-right: 10px;
}
.form-help {
    margin-left: 10px;
    color: darkblue;
}

button {
    margin-bottom: 15px;
    padding: 10px;
}

.alert {
    font-size: 1.2em;
    padding: 10px;
    background: papayawhip;
}

.form-feedback-error {
    font-size: 1.2em;
    color: red;
    padding: 10px;
    border: 1px solid darkred;
}
</style>