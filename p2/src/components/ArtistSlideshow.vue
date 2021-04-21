<template>
    <div id="artist-slideshow">
        <h3>
            {{ oneArtistDetail.PublicFirstName }}
            {{ oneArtistDetail.PublicLastName }}
        </h3>
        <p>{{ oneArtistDetail.ShortDescription }}</p>
        <div v-if="oneArtistDetail.image_data.length > 0">
            <img
                :src="getPic()"
                v-bind:alt="oneArtistDetail.PublicLastName"
                style="max-height: 35vh"
            />
            <div v-if="oneArtistDetail.image_data.length > 1">
                <div>
                    Image Number: {{ imageNumber }} of
                    {{ maxImageNumber }}

                    <button style="margin: 10px" v-on:click="nextImage()">
                        NEXT >>
                    </button>
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
            if (this.imageIndex >= this.maxImageIndex) {
                this.imageIndex = 0;
            }
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

        maxImageNumber() {
            return this.oneArtistDetail.image_data.length + 1;
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
button {
    display: inline-block;
    border: none;
    padding: 0.2rem 0.3rem;
    margin: 0;
    text-decoration: none;
    background: #dcdfe4;
    color: #777777;
    font-family: sans-serif;
    font-size: 1rem;
    text-align: center;
}
button:hover {
    color: #975a5a;
}
</style>