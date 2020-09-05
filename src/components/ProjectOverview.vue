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

            <a class="project__link" :href="details.projectLink">Project Link</a>
            <button class="btn btn__success project__btn">Overview of Project</button>
        </div>
            
        <p class="project__location">Location: {{ details.contactCity }}, {{ details.contactCountry }}</p>
        
        <div class="project__themes-container">
            <p class="project__themes-title">Themes:</p>
            <ul class="project__themes">
                <li class="project__theme" v-for="theme of details.themes.theme" :key="theme.id">{{ theme.name }}</li>
            </ul>
        </div>
        
    </div>
</template>

<script>
    export default {
        props: {
            details: Object
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
    .project {
        padding: 1rem;
        border: 1px solid grey;
        border-radius: 3rem;
        text-align: center;

        & > * {
            font-size: 1.4rem;
        }

        &__title {
            font-size: 2rem;
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

            &--achieved {
                height: 100%;
                background: linear-gradient(to right, var(--color-green-secondary), var(--color-green-primary));
                position: absolute;
                top: 0;
                left: 0;
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

        &__location {
            margin: 1rem;
        }

        &__themes-container {
            display: flex;
            justify-content: flex-end;
        }

        &__themes-title {
            margin: 0;
        }

        &__themes {
            padding: 0;
            list-style: none;
            display: flex;
            justify-content: center;
        }

        &__theme {
            margin: 0 .5rem;
        }
    }
</style>