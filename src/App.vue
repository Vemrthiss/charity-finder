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
    }

    body {
        padding: 3rem;
    }
</style>