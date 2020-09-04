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
    @mixin respond-tab-small {
        @media only screen and (min-width: 26em){@content;}
    }

    @mixin respond-tab {
        @media only screen and (min-width: 48em){@content;}
    }

    @mixin respond-laptop {
        @media only screen and (min-width: 64em){@content;}
    }

    @mixin respond-desktop {
        @media only screen and (min-width: 86em){@content;}
    }

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

        @include respond-tab {
            padding: 1rem;
        }

        @include respond-laptop {
            padding: 2rem;
        }

        @include respond-desktop {
            padding: 3rem;
        }
    }

    .btn {
        font-family: inherit;
        cursor: pointer;
        border: none;
        outline: none;
    }
</style>