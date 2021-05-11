<!-- Page to logout -->

<template>
    <div id="logout-page">Logout</div>
</template>

<script>
import { axios } from "@/common/app.js";

export default {
    mounted() {
        axios.post("logout").then((response) => {
            if (response.data.success) {
                this.$store.commit("setUser", false);
            }
        });
    },
};
</script>


<style scoped>
button {
    margin-bottom: 15px;
    padding: 10px;
}
</style>