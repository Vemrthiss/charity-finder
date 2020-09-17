<template>
    <div class="about-group" :class="aboutGroupStyles">
        <slot></slot>
    </div>
</template>

<script>
    import throttle from 'lodash/throttle';

    export default {
        data: function() {
            return {
                isRevealed: false,
                throttledScroller: throttle(this.scrollCaller, 200).bind(this)
            }
        },
        computed: {
            aboutGroupStyles() {
                return {
                    'about-group--revealed': this.isRevealed
                }
            }
        },
        methods: {
            calcScrolling(el) {
                const scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100;
                if (scrollPercent < 75) { //i.e: once element reaches at least btm 25% of viewport
                    this.isRevealed = true;
                }
            },
            scrollCaller() {
                console.log('scroll function ran');
                this.calcScrolling(this.$el);
            }
        },
        created() {
            window.addEventListener('scroll', this.throttledScroller);
        },
        watch: {
            isRevealed(newVal) {
                if (newVal) { //once "isRevealed" is true, remove scroll event listener
                    window.removeEventListener('scroll', this.throttledScroller);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .about-group {
        transition: all 1s;
        opacity: 0;
        transform: translateY(4rem);

        &--revealed {
            opacity: 1;
            transform: translateY(0);
        }

        &:not(:first-child) {
            margin: 10rem 0;
        }
    }
</style>