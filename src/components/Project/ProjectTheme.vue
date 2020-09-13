<template>
    <li class="theme" :class="selectedTheme" @click="toggleTheme" ref="self">
        <span class="theme__name">{{ name }}</span>
        <div class="theme__circle"></div>
    </li>
</template>

<script>
    export default {
        data: function() {
            return {
                name: this.theme.name
            }
        },
        props: {
            theme: Object
        },
        computed: {
            currentThemeQueries() {
                return this.$store.getters.getQueries.themes;
            },
            isCurrentTheme() {
                return this.currentThemeQueries.includes(this.name);
            },
            selectedTheme() {
                return {
                    'theme--selected': this.isCurrentTheme
                }
            }
        },
        methods: {
            toggleTheme() {
                if (this.$refs.self.classList.contains('project__theme')) { //only attach this handler to add theme if the theme is in the overview component and not the detail component
                    let currentThemesCopy = this.currentThemeQueries.slice();
                    if (this.isCurrentTheme) { //if theme is already selected, remove it
                        currentThemesCopy = currentThemesCopy.filter(theme => theme !== this.name);
                    } else {
                        currentThemesCopy.push(this.name);
                    }
                    this.$store.dispatch('editThemeQueries', currentThemesCopy);
                    this.$store.dispatch('filterProjects');
                    this.$emit('changed-query');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .theme {
        margin: .5rem;
        padding: .7rem 0;
        padding-right: 1rem;
        clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);
        cursor: pointer;
        transition: all .3s;
        background: linear-gradient(to right, var(--color-red-primary), var(--color-purple-primary));
        color: white;

        &:hover {
            transform: rotate(-3deg) translateX(3px);
        }

        &:active {
            transform: rotate(-1deg) translateX(1px);
        }

        &__name {
            margin: 0 .5rem;
        }

        &__circle {
            height: 1rem;
            width: 1rem;
            background-color: white;
            display: inline-block;
            border-radius: 50%;
        }

        &--selected {
            background: linear-gradient(to right, var(--color-green-primary), var(--color-green-secondary)) !important;
            color: black !important;
        }
    }
</style>