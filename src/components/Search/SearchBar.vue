<template>
    <div class="search">
        <h1 class="search__title">Search projects by:</h1>

        <transition name="clear-btn">
            <button class="btn search__clear-btn" v-if="queriesPresent" @click="clearAllQueries">Clear all search filters</button>
        </transition>

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

            <transition name="theme-field">
                <ul v-if="showThemes" class="search__themes-list">
                    <search-theme v-for="theme in themes" :key="theme" :searchThemes="searchThemes" @check-theme="searchThemes = $event">{{ theme }}</search-theme>
                </ul>
            </transition>
        </div>

        <transition name="filter-bar">
            <div class="search__filter-bar" v-if="currentThemeQueries.length !== 0">
                <p class="search__filter-label">Filtering by:</p>
                <ul class="search__filter-list">
                    <transition-group name="theme" class="search__filter-list--wrapper">
                        <filter-theme v-for="theme in currentThemeQueries" :key="theme" :theme="theme" @remove-theme="removeThemeQuery"></filter-theme>
                    </transition-group>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    import SearchTheme from './SearchTheme.vue';
    import FilterTheme from './FilterTheme.vue';

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
                this.$emit('changed-query'); // to tell finder component that a query was changed ==> to reset to page 1
            },
            searchCountry(newVal) {
                this.$store.dispatch('changeCountryQuery', this.searchCountry);
                this.$store.dispatch('filterProjects');
                this.$emit('changed-query'); // to tell finder component that a query was changed ==> to reset to page 1
            },
            searchThemes(newVal) {
                this.$store.dispatch('editThemeQueries', this.searchThemes);
                this.$store.dispatch('filterProjects');
                this.$emit('changed-query'); // to tell finder component that a query was changed ==> to reset to page 1
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
            },
            currentThemeQueries() {
                return this.$store.getters.getQueries.themes;
            },
            queriesPresent() {
                const queriesStateObj = this.$store.getters.getQueries;
                return queriesStateObj.text || queriesStateObj.country || queriesStateObj.themes.length !== 0;
            }
        },
        methods: {
            revealThemes() {
                this.showThemes = !this.showThemes;
            },
            removeThemeQuery($event) {
                const themeClicked = $event;
                this.searchThemes = this.searchThemes.filter(theme => theme !== themeClicked);
            },
            clearAllQueries() {
                this.searchText = '';
                this.searchCountry = '';
                this.searchThemes = [];
            }
        },
        components: {
            searchTheme: SearchTheme,
            filterTheme: FilterTheme
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

        &__clear-btn {
            display: inline-block;
            margin: 1rem auto;
            padding: .7rem 1.2rem;
            border-radius: 1rem;
            text-transform: uppercase;
            letter-spacing: .5px;
            transition: all .3s;

            &:hover {
                background: linear-gradient(to right, var(--color-red-primary), var(--color-purple-primary));
                color: white;
                transform: translateY(-.4rem);
                box-shadow: 0 .5rem 1rem rgba(0,0,0, .7);
            }

            &:active {
                transform: translateY(-.2rem);
                box-shadow: 0 .3rem .5rem rgba(0,0,0, .7);
            }
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

        &__filter-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
        }

        &__filter-label {
            margin-right: 1rem;
        }

        &__filter-list {
            list-style: none;
            padding: 0;

            &--wrapper {
                display: flex;
            }
        }
    }

    .clear-btn-enter-active {
        animation: zoomIn .7s;
    }

    .clear-btn-leave-active {
        animation: zoomOut .7s;
    }

    .theme-field-enter-active {
        animation: fadeIn 1s;
    }

    .theme-field-leave-active {
        animation: fadeOut .8s;
    }

    .filter-bar-enter {
        transform: translateX(-5rem);
        opacity: 0;
    }

    .filter-bar-leave-to {
        transform: translateX(5rem);
        opacity: 0;
    }

    .filter-bar-enter-active, .filter-bar-leave-active {
        transition: all 1s;
    }

    .theme-enter {
        transform: translateY(3rem);
        opacity: 0;
    }

    .theme-leave-to {
        transform: translateY(-3rem);
        opacity: 0;
    }

    .theme-enter-active, .theme-leave-active {
        transition: all 1s;
    }

    .theme-leave-active {
        position: absolute;
    }

    .theme-move {
        transition: transform 1s;
    }
</style>