<template>
    <div id="artist-slideshow">
        <h2>
            {{ oneArtistDetail.PublicFirstName }}
            {{ oneArtistDetail.PublicLastName }}
        </h2>
        <p>
            <em>{{ oneArtistDetail.ShortDescription }}</em>
        </p>

        <div class="flex-container">
            <div v-if="oneArtistDetail.image_data.length > 0">
                <div class="flex-column2">
                    <img
                        :src="getPic()"
                        v-bind:alt="oneArtistDetail.PublicLastName"
                        style="max-height: 35vh"
                    />
                    <div v-if="oneArtistDetail.image_data.length > 1">
                        <div>
                            Image Number: {{ imageNumber }} of
                            {{ maxImageIndex }}

                            <button
                                class="select-button"
                                v-on:click="nextImage()"
                            >
                                NEXT >>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-column1">
                <b>Name: </b>{{ oneArtistDetail.image_data[imageIndex].Title
                }}<br />
                <b>Medium: </b>{{ oneArtistDetail.image_data[imageIndex].Medium
                }}<br />
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
.flex-container {
    display: flex;
    width: 100%;
    align-items: center;
}

.flex-column1 {
    flex: 1;
    padding: 15px;
    margin: 15px;
}
.flex-column2 {
    flex: 3;
}
</style>