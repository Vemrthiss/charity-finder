<template>
    <li class="search__theme" @click="toggleThemeQuery" :class="{'search__theme--checked': checkedBox}">
        <slot></slot>
    </li>
</template>

<script>
    export default {
        data: function() {
            return {
                checkedBox: false
            }
        },
        computed: {
            currentThemeQueries() {
                return this.$store.getters.getQueries.themes;
            }
        },
        props: {
            searchThemes: Array
        },
        methods: {
            toggleThemeQuery($event) {
                const theme = $event.target.textContent;
                let newSearchThemes = this.searchThemes.slice(); //creating shallow copy, in order not to directly mutate a prop
                if (!newSearchThemes.includes(theme)) { //if array doesn't contain this theme, add it
                    newSearchThemes.push(theme);
                } else { //if array contains this theme, remove it
                    newSearchThemes = newSearchThemes.filter(el => el !== theme);
                }
                this.checkedBox = !this.checkedBox;
                this.$emit('check-theme', newSearchThemes);
            }
        },
        created() {
            this.checkedBox = this.currentThemeQueries.includes(this.$slots.default[0].text); //to check if this theme is already checked, if so, mark it as checked whenever the popup opens again
        },
        updated() {
            this.checkedBox = this.currentThemeQueries.includes(this.$slots.default[0].text);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/mixins.scss";

    .search__theme {
        font-size: 1.6rem;
        padding: 1rem;
        position: relative;
        cursor: pointer;
        transition: all .2s;

        @include respond-laptop {
            font-size: 1.4rem;
        }

        &::before {
            content: "";
            background-color: white;
            width: 1rem;
            height: 1rem;
            display: inline-block; //else won't appear
            position: absolute;
            top: 50%;
            left: 5%;
            transform: translate(-50%, -50%);
            transition: all .15s;
        }

        &:hover {
            background-color: var(--color-blue-secondary);
            color: white;
        }

        &--checked { //only applied when a theme is "checked"

            &::before {
                background-color: var(--color-green-secondary-dark);
            }
        }
    }
</style>