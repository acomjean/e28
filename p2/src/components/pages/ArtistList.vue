<template>
    <div id="artist-list">
        <h2>Somerville Open Studios SPA</h2>
        <p>List of Current Artists</p>

        <h3>Medium</h3>

        <input
            type="checkbox"
            id="BooksPaper"
            value="Books+Paper"
            v-model="checkedGenres"
        />
        <label for="BooksPaper"> Books + Paper </label>

        <input
            type="checkbox"
            id="Collage"
            value="Collage"
            v-model="checkedGenres"
        />
        <label for="Collage"> Collage </label>

        <input
            type="checkbox"
            id="Drawing"
            value="Drawing"
            v-model="checkedGenres"
        />
        <label for="Drawing"> Drawing </label>

        <input
            type="checkbox"
            id="FiberTextiles"
            value="Fiber+Textiles"
            v-model="checkedGenres"
        />
        <label for="FiberTextiles"> Fiber + Textiles </label>

        <input
            type="checkbox"
            id="Furniture"
            value="Furniture"
            v-model="checkedGenres"
        />
        <label for="Furniture"> Furnitures</label>

        <input
            type="checkbox"
            id="GlassMosaics"
            value="Glass+Mosaics"
            v-model="checkedGenres"
        />
        <label for="GlassMosaics"> Glass + Mosaics</label>

        <input
            type="checkbox"
            id="GraphicDesign"
            value="GraphicDesign"
            v-model="checkedGenres"
        />
        <label for="GraphicDesign"> Graphic Design </label>

        <input
            type="checkbox"
            id="Installation"
            value="Installation"
            v-model="checkedGenres"
        />
        <label for="Installation"> Installation </label>

        <input
            type="checkbox"
            id="JewelryBeads"
            value="Jewelry+Beads"
            v-model="checkedGenres"
        />
        <label for="JewelryBeads"> Jewelry + Beads </label>

        <input
            type="checkbox"
            id="Mixed-Media"
            value="Mixed-Media"
            v-model="checkedGenres"
        />
        <label for="Mixed-Media"> Mixed-Media </label>

        <input
            type="checkbox"
            id="Painting"
            value="Painting"
            v-model="checkedGenres"
        />
        <label for="Painting"> Painting </label>

        <input
            type="checkbox"
            id="Photography"
            value="Photography"
            v-model="checkedGenres"
        />
        <label for="Photography"> Photography </label>

        <input
            type="checkbox"
            id="Pottery"
            value="Pottery"
            v-model="checkedGenres"
        />
        <label for="Pottery"> Pottery </label>

        <input
            type="checkbox"
            id="Printmaking"
            value="Printmaking"
            v-model="checkedGenres"
        />
        <label for="Printmaking"> Printmaking </label>

        <input
            type="checkbox"
            id="Sculpture"
            value="Sculpture"
            v-model="checkedGenres"
        />
        <label for="Sculpture"> Sculpture </label>

        <input
            type="checkbox"
            id="Video"
            value="Video"
            v-model="checkedGenres"
        />
        <label for="Video"> Video </label>

        <input
            type="checkbox"
            id="Other "
            value="Other "
            v-model="checkedGenres"
        />
        <label for="Other"> Other </label>

        <div id="searchSelection">
            {{ checkedGenres }}
        </div>

        <h2>List counts</h2>
        Total Artists :{{ artistCount }}

        
        <h2>Artists Found</h2>
        <ul class="thumb_container">
            <li
                v-for="oneArtist in filterdList"
                v-bind:key="oneArtist.member_id"
            >
                <img
                    :src="getPic(oneArtist)"
                    v-bind:alt="oneArtist.PublicLastName"
                    height="170"
                    width="170"
                />
                {{ oneArtist.PublicFirstName }} {{ oneArtist.PublicLastName }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        getPic(artistData) {
            console.log(artistData);
            return (
                this.imageBaseUrl +
                "/" +
                artistData["thumb_data"]["filename_and_path"]
            );
        },
    },

    data() {
        return {
            checkedGenres: [],
            imageBaseUrl: "https://www.somervilleopenstudios.org",
        };
    },

    computed: {
        // Get the results of the last gamed played.
        artistCount() {
            if (this.artistList.length > 0) {
                return this.artistList.length;
            } else {
                return null;
            }
        },
        artistList() {
            return this.artistData.artist_data;
        },
        filterdList() {
            if (this.checkedGenres.length == 0) {
                console.log("NONE Checekd");

                return [];
            } else {
                /*
                var oneGenre = this.checkedGenres[0];
                var items = this.artistData.artist_data.filter(
                    (item) => item.genres_array.indexOf(oneGenre) !== -1
                );
                */
                var filtered = [];
                for (var i = 0; i < this.artistList.length; i++) {
                    console.log(i);
                    var found = this.artistList[i]["genres_array"].some(
                        (r) => this.checkedGenres.indexOf(r) >= 0
                    );

                    console.log(i + " " + found);
                    if (found) {
                        console.log(
                            "found " +
                                this.artistData.artist_data[i]["member_id"]
                        );
                        filtered.push(this.artistData.artist_data[i]);
                    }
                }
                return filtered;
            }
        },
    },

    props: {
        artistData: {
            type: Object,
            default: null,
        },
    },
};
</script>

<style>
.thumb_container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 1px;
    list-style: none;
    margin: 0;
    padding: 2.2rem;
    background-color: #fcfcff;
}

.thumb_container li {
    font-size: 0.9em;
    margin: auto;
    background: white;
    padding: 10px 10px;
    margin-top: 10px;
    border-radius: 30px 0 /0px 0px;
    box-shadow: 0px 1px 2px 1px #c4c4c4;
    min-height: 200px;
    min-width: 150px;
    max-width: 180px;

    border: 0px solid gray;
}
.thumb_container li img {
    margin:auto

}

</style>