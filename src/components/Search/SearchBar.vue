<template>
    <div class="search">
        <h1 class="search__title">Search projects by:</h1>

        <div class="search__wrapper">
            <div class="search__bar">
                <input class="search__input" type="text" placeholder="Text" v-model="searchText">
                <input class="search__input" type="text" placeholder="Country" v-model="searchCountry">

                <div class="search__themes-header" @click="revealThemes">
                    <p class="search__themes-title">Themes</p>
                    <svg :style="chevronRotation" xmlns="http://www.w3.org/2000/svg" class="search__themes-icon icon icon-tabler icon-tabler-chevron-down" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </div>

            <ul v-if="showThemes" class="search__themes-list">
                <search-theme v-for="theme in themes" :key="theme" :searchThemes="searchThemes" @check-theme="searchThemes = $event">{{ theme }}</search-theme>

                <!-- test code for CSS styling only-->
                <!-- <search-theme v-for="n in 19" :key="n" :searchThemes="searchThemes" @check-theme="searchThemes = $event">Theme {{n}}</search-theme> -->
            </ul>
        </div>
    </div>
</template>

<script>
    import SearchTheme from './SearchTheme.vue';

    export default {
        data: function() {
            return {
                searchText: '',
                searchCountry: '',
                searchThemes: [],
                showThemes: false
            }
        },
        watch: {
            searchText(newVal) {
                this.$store.dispatch('changeTextQuery', this.searchText);
                this.$store.dispatch('filterProjects');
            },
            searchCountry(newVal) {
                this.$store.dispatch('changeCountryQuery', this.searchCountry);
                this.$store.dispatch('filterProjects');
            },
            searchThemes(newVal) {
                this.$store.dispatch('editThemeQueries', this.searchThemes);
                this.$store.dispatch('filterProjects');
            }
        },
        computed: {
            themes() {
                return this.$store.getters.getAllThemes;
            },
            chevronRotation() {
                return {
                    transform: this.showThemes ? 'rotateZ(-180deg)' : 'rotateZ(0deg)'
                }
            }
        },
        methods: {
            revealThemes() {
                this.showThemes = !this.showThemes;
            }
        },
        components: {
            searchTheme: SearchTheme
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/mixins.scss";

    .search {
        text-align: center;

        &__title {
            text-transform: uppercase;
            letter-spacing: .8px;
        }

        &__wrapper {
            margin: 0 auto;

            @include respond-tab {
                width: 70%;
            }

            @include respond-laptop {
                width: 65%;
            }

            @include respond-desktop {
                width: 60%;
            }
        }

        &__bar {
            display: flex;
            flex-direction: column;
            align-items: center;

            @include respond-tab {
                display: grid;
                grid-template-columns: repeat(2, 40%) 1fr;
                gap: 1rem;
                height: auto;
            }

            @include respond-laptop {
                gap: 2rem;
            }

            @include respond-desktop {
                gap: 3rem;
            }
        }

        &__input {
            outline: none;
            border: 1px solid black;
            padding: .5rem 1rem;
            border-radius: 1rem;
        }

        &__themes-header {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        &__themes-title {
            margin-right: 1rem;
        }

        &__themes-icon {
            width: 2rem;
            height: 2rem;
            transition: all .3s;
        }

        &__themes-list {
            background-color: rgba(#eeeeee, .7);
            padding: 1rem;
            list-style: none;
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(2, 1fr);

            @include respond-tab {
                grid-template-columns: repeat(3, 1fr);
            }

            @include respond-laptop {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    }
</style>