<template>
    <div>
        <nav-bar></nav-bar>

        <router-view></router-view>
    </div>
</template>

<script>
    import Nav from './components/Nav.vue';

    export default {
        components: {
            navBar: Nav
        }
    }
</script>

<style lang="scss">
    *, *::before, *::after {
        box-sizing: inherit;
    }

    html {
        box-sizing: border-box;
        font-size: 62.5%;
        font-family: 'Lato', sans-serif;
    }

    body {
        padding: 0;

        @media only screen and (min-width: 48em) {
            padding: 1rem;
        }

        @media only screen and (min-width: 64em) {
            padding: 2rem;
        }

        @media only screen and (min-width: 86em) {
            padding: 3rem;
        }
    }

    .btn {
        font-family: inherit;
        cursor: pointer;
        border: none;
    }
</style>