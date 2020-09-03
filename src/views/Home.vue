<template>
    <div class="main">
        <div class="home">
            <picture class="home__picture">
            <source srcset="../assets/home-mobile.jpg 1x, ../assets/home-mobile-high.jpg 3x" media="(max-width: 640px)">
            <img
            srcset="../assets/home-small.jpg 640w, ../assets/home-medium.jpg 1920w"
            sizes="(min-width: 768px) 80vw, (min-width: 1280px) 80vw, (min-width: 1920px) 80vw, 640px"
            src="../assets/home-small.jpg" 
            alt="home"
            class="home__img">
        </picture>
        </div>
        
        <div class="about" id="about">

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'
    
    export default {
        name: 'Home',
        components: {
            //HelloWorld
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        background-color: rgba(#00ff55, .45);
        position: relative;
        height: 115vh;

        &__img {
            position: absolute;
            left: 50%;
            z-index: -10;

            transform: translateX(-50%);
        }
    }
</style>