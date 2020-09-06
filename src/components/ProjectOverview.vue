<template>
    <div class="project">
        <h1 class="project__title">{{ details.title }}</h1>
        <div class="project__body">
            <div class="project__img-wrapper">
                <img class="project__img" :src="details.imageLink" alt="project image">
            </div>
            <div class="project__goal">
                <h3 class="project__goal-title">Progress</h3>
                <div class="project__goal-progress-bar">
                    <div class="project__goal-progress-bar--achieved" :style="{width: projectCompletion}"></div>
                </div>
                <p class="project__goal-details">${{ amountRemaining }} of ${{ details.goal }} remaining</p>
            </div>
            
            <div class="project-wrapper project__link-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link project__icon project__icon--link" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                    <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                </svg>
                <a class="project__link" :href="details.projectLink">Project Link</a>
            </div>
            
            <button class="btn btn__success project__btn">Overview of Project</button>
        </div>

        <div class="project__footer" v-if="viewWidth > 1366">
            <div class="project-wrapper project__location-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin project__icon project__icon--location" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <circle cx="12" cy="11" r="3" />
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                </svg>

                <p class="project__location">{{ details.contactCity }}, {{ details.contactCountry }}</p>
            </div>
            
            <div class="project__themes-wrapper project__themes-wrapper--inline">
                <p class="project__themes-title">Themes:</p>
                <ul class="project__themes">
                    <li class="project__theme" v-for="theme of details.themes.theme" :key="theme.id">
                        <span class="project__theme-name">{{ theme.name }}</span>
                        <div class="project__theme-circle"></div>
                    </li>
                </ul>
            </div>
        </div>

        <template v-else>
            <div class="project-wrapper project__location-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin project__icon project__icon--location" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <circle cx="12" cy="11" r="3" />
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                </svg>

                <p class="project__location">{{ details.contactCity }}, {{ details.contactCountry }}</p>
            </div>
            
            <div class="project__themes-wrapper">
                <p class="project__themes-title">Themes:</p>
                <ul class="project__themes">
                    <li class="project__theme" v-for="theme of details.themes.theme" :key="theme.id">
                        <span class="project__theme-name">{{ theme.name }}</span>
                        <div class="project__theme-circle"></div>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            details: Object,
            viewWidth: Number
        },
        computed: {
            amountRemaining() {
                return Math.round(this.details.remaining);
            },
            projectCompletion() {
                return `${100 - Math.round(this.amountRemaining / this.details.goal * 100)}%`;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/mixins.scss";
    @import "../styles/animations.scss";

    .project {
        height: 100%;
        padding: 1rem;
        border: 1px solid grey;
        border-radius: 3rem;
        text-align: center;
        position: relative; //for abs positioning of location wrapper at laptop breakpoint

        & > * {
            font-size: 1.4rem;
        }

        &__title {
            font-size: 2rem;
            margin: 0;
        }

        &__body {
            display: grid;
            grid-template-columns: min-content 1fr;
            gap: 1.5rem 2.5rem;
            justify-items: center;
            padding: 1rem;
        }

        &__img-wrapper {
            width: 10rem;
            height: 10rem;
            border-radius: 50%;
            overflow: hidden;
        }

        &__img {
            height: 100%;
        }

        &__goal-title {
            position: relative;

            &::after {
                content: "";
                height: 1.25px;
                width: 70%;
                background-color: rgba(#eee, 1);
                position: absolute;
                bottom: -2px;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        &__goal-progress-bar {
            width: 20rem;
            height: 2rem;
            background-color: rgba(#eee, .9);
            position: relative;
            border-radius: 1rem;

            &--achieved {
                height: 100%;
                background: linear-gradient(to right, var(--color-green-secondary), var(--color-green-primary));
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 1rem;
            }
        }

        &__link {
            text-decoration: none;

            &:link {
                color: var(--color-blue-primary-light);
            }

            &:visited {
                color: var(--color-blue-secondary-dark);
            }

            &:hover {
                border-bottom: 1px solid currentColor;
                animation: bounceUpDown 1s infinite;
            }
        }

        &__btn {
            padding: .8rem 1.2rem;
            border-radius: 3rem;
            transition: all .3s;

            &:hover {
                transform: translateY(-.4rem);
                box-shadow: .5rem .7rem .5rem rgba(0,0,0, .5);
            }

            &:active {
                transform: translateY(-.2rem);
                box-shadow: .5rem .5rem .7rem rgba(0,0,0, .5);
            }
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__location {
            margin: 1rem .5rem;
        }

        &__themes-wrapper {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            &--inline {
                max-width: 60%;
            }
        }

        &__themes-title {
            margin: 0;
        }

        &__themes {
            padding: 0;
            list-style: none;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }

        &__theme {
            margin: .5rem;
            padding: .7rem 0;
            padding-right: 1rem;
            clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);
            background-color: grey;
            cursor: pointer;
            transition: all .3s;

            &:hover {
                transform: rotate(-3deg) translateX(3px);
            }

            &:active {
                transform: rotate(-1deg) translateX(1px);
            }
        }

        &__theme-name {
            margin: 0 .5rem;
        }

        &__theme-circle {
            height: 1rem;
            width: 1rem;
            background-color: white;
            display: inline-block;
            border-radius: 50%;
        }

        &__icon {
            width: 2.4rem;
            height: 2.4rem;
        }
    }

    .project-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>