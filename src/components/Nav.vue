<template>
    <div class="nav" :class="navClass">
        <button class="btn nav-burger" @click="toggleBtn">
            <div class="nav-burger__centre" :class="burgerClass"></div>
        </button>
        <div class="nav-content" v-if="menuShown">
            <router-link to="/" class="nav-content__link" :class="linkClass" active-class="nav-content__link--active" exact>Home</router-link>
            <router-link to="/finder" class="nav-content__link" :class="linkClass" active-class="nav-content__link--active">Project Finder</router-link>
            <a href="https://github.com/Vemrthiss/charity-finder" class="nav__github-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github nav__github" viewBox="0 0 24 24" stroke-width="1.5" :stroke="githubStrokeColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <path d="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21a4.192 4.192 0 0 0 -.08 -3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 0 0 4 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                menuShown: false,
                onFinder: false
            }
        },
        props: {
            onAbout: Boolean
        },
        computed: {
            burgerClass() {
                return {
                    'nav-burger__centre--collapsed': this.menuShown,
                    'nav-burger__centre--finder': this.onFinder,
                    'nav-burger__centre--about': this.onAbout
                };
            },
            linkClass() {
                return {
                    'nav-content__link--finder': this.onFinder,
                    'nav-content__link--about': this.onAbout
                }
            },
            navClass() {
                return {
                    'nav--finder': this.onFinder,
                    'nav--hidden': this.projectOverlayShown
                }
            },
            githubStrokeColor() {
                return this.onFinder || this.onAbout ? '#000000' : '#ffffff';
            },
            projectOverlayShown() {
                return this.$store.getters.isProjectOverlay;
            }
        },
        watch: {
            $route(to, from) {
                if (to.name === 'Finder') {
                    this.onFinder = true;
                } else if (to.name === 'Home') {
                    this.onFinder = false;
                }
            }
        },
        methods: {
            toggleBtn() {
                this.menuShown = !this.menuShown;
            }
        },
        created() {
            if (this.$route.path === '/finder') { // if this navbar/app was initialised on finder, change its style to black
                this.onFinder = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/mixins.scss";

    .nav {
        position: fixed;
        top: 1.5rem;
        right: 1.5rem;
        z-index: 100;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        transition: all .7s;

        &--finder {
            top: 8rem;
        }

        @include respond-tab-small {
            top: 1.5rem;
            right: 1.5rem;
        }

        @include respond-tab {
            top: 2.5rem;
            right: 2.5rem;
        }

        @include respond-laptop {
            top: 3.5rem;
            right: 3.5rem;
        }

        @include respond-desktop {
            top: 4.5rem;
            right: 4.5rem;
        }

        &--hidden {
            opacity: 0;
        }

        &__github {
            width: 3rem;
            height: 3rem;
            transition: all .3s;

            &:hover {
                transform: translateY(-3px) scale(1.1);
            }

            &:active {
                transform: translateY(-1.5px) scale(1.05);
            }
        }
    }

    .nav-burger {
        display: block;
        height: 3rem;
        width: 3rem;
        padding: 0;
        background-color: transparent;
        transition: all .2s;

        &:hover {
            transform: scale(1.1);
        }

        &__centre {
            height: .2rem;
            width: inherit;
            background-color: rgba(255, 255, 255, .8);
            position: relative;
            transition: background-color .3s;

            &::before, &::after {
                content: "";
                height: inherit;
                width: inherit;
                background-color: rgba(255, 255, 255, .8);
                position: absolute;
                left: 50%;
                transform: translateX(-50%) rotate(0) scaleX(1);
                transition: all .3s;
            }

            &::before {
                top: -1.2rem;
                transform-origin: top left;
            }

            &::after {
                bottom: -1.2rem;
                transform-origin: bottom left;
            }

            &--collapsed { //applied when menu is open --> form a cross
                background-color: transparent !important;

                &::before {
                    transform: translateX(-50%) rotate(50deg) scaleX(1.05);
                }

                &::after {
                    transform: translateX(-50%) rotate(-50deg) scaleX(1.05);
                }
            }

            &--finder, &--about {
                background-color: rgba(0, 0, 0, .8);

                &::before, &::after {
                    background-color: rgba(0, 0, 0, .8);
                }
            }
        }
    }

    .nav-content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-top: 1.5rem;

        &__link {
            margin: .5rem 0;
            font-size: 1.8rem;
            color: white;
            text-decoration: none;
            transition: all .2s;
            border: none;

            &:hover {
                transform: translateY(-3px) scale(1.1);
            }

            &:active {
                transform: translateY(-1.5px) scale(1.05);
            }

            &--finder, &--about {
                color: black;
            }

            &--active {
                text-decoration: underline;
                color: var(--color-purple-primary);
            }
        }
    }
</style>