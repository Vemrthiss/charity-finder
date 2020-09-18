<template>
    <div class="about" id="about">
        <about-group>
            <p class="about__headings">Ever wanted to donate to a charitable cause?</p>
            <picture class="about__img about__donate">
                <source srcset="../assets/donate-medium.jpg" media="(min-width: 64em)">
                <source srcset="../assets/donate-large.jpg" media="(min-width: 86em)">
                <img src="../assets/donate-small.jpg" alt="donate picture">
            </picture>
        </about-group>

        <about-group>
            <p class="about__headings">Would you like to be part of a bigger movement to help others?</p>
            <picture class="about__img about__movement">
                <source srcset="../assets/movement-medium.jpg" media="(min-width: 64em)">
                <source srcset="../assets/movement-large.jpg" media="(min-width: 86em)">
                <img src="../assets/movement-small.jpg" alt="movement picture">
            </picture>
        </about-group>

        <about-group>
            <p class="about__headings">Click the button below to use our search engine to find a project that resonates with you!</p>
            <to-find></to-find>
        </about-group>
    </div>
</template>

<script>
    import toFind from '../components/BtnToFind.vue';
    import aboutGroup from './AboutGroup.vue';
    import throttle from 'lodash/throttle';

    export default {
        data: function() {
            return {
                onAbout: false,
                throttledScroller: throttle(this.calcScrolling, 200).bind(this)
            }
        },
        components: {
            toFind,
            aboutGroup
        },
        methods: {
            calcScrolling() {
                const scrollPercent = (this.$el.getBoundingClientRect().top / window.innerHeight) * 100;
                if (scrollPercent < 25) { //i.e: once element reaches at least top 25% of viewport
                    this.onAbout = true;
                } else {
                    this.onAbout = false;
                }
                this.$emit('on-about', this.onAbout); //to tell parent component (home) that 25% of viewport is already on about section
            }
        },
        created() {
            window.addEventListener('scroll', this.throttledScroller);
        }
    }
</script>

<style lang="scss" scoped>
    .about {
        text-align: center;

        &__headings {
            font-size: 2rem;
            margin: 0;
            margin-bottom: 2rem;
        }

        &__img {
            width: 40%;

            & > * {
                width: inherit;
            }
        }
    }
</style>