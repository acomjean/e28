<template>
    <div id="artist-slideshow">
        <h3>
            {{ oneArtistDetail.PublicFirstName }}
            {{ oneArtistDetail.PublicLastName }}
        </h3>
        <div v-if="oneArtistDetail.image_data.length > 0">
            <img :src="getPic()" v-bind:alt="oneArtistDetail.PublicLastName" />
            <div v-if="oneArtistDetail.image_data.length > 1">
                <div>
                    Image Number: {{ imageNumber }}

                    <button v-on:click="nextImage()">NEXT >></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        // load picture (just setting the atr with vue will not work)
        getPic() {
            return (
                this.imgBaseUrl +
                "/" +
                this.oneArtistDetail["image_data"][this.imageIndex]["filename"]
            );
        },
        nextImage() {
            var nextImage = this.imageIndex + 1;
            if (nextImage >= this.maxImageIndex) {
                this.imageIndex = 0;
            } else {
                this.imageIndex = nextImage;
            }
        },
    },

    computed: {
        maxImageIndex() {
            return this.oneArtistDetail.image_data.length;
        },

        imageNumber() {
            return this.imageIndex + 1;
        },
    },

    props: {
        oneArtistDetail: {
            type: Object,
        },
        imgBaseUrl: {
            type: String,
        },
    },
    data() {
        return {
            imageIndex: 0,
        };
    },
};
</script>

<style scoped>
</style>