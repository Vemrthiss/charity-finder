<template>
    <div class="nav" :class="navClass">
        <button class="btn nav-burger" @click="toggleBtn">
            <div class="nav-burger__centre" :class="burgerClass"></div>
        </button>
        <div class="nav-content" v-if="menuShown">
            <router-link to="/" class="nav-content__link" :class="linkClass" active-class="nav-content__link--active" exact>Home</router-link>
            <router-link to="/finder" class="nav-content__link" :class="linkClass" active-class="nav-content__link--active">Project Finder</router-link>
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
                    'nav--finder': this.onFinder
                }
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