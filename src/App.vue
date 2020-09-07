<template>
    <div>
        <nav-bar></nav-bar>

        <!-- keep alive the router-view so that the finder route will not lose its data/user preferences when switching -->
        <keep-alive> 
            <router-view></router-view>
        </keep-alive>
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
    @import "./styles/mixins.scss";

    *, *::before, *::after {
        box-sizing: inherit;
    }

    html {
        box-sizing: border-box;
        font-size: 50%; //1rem = 8px
        font-family: 'Lato', sans-serif;

        @include respond-tab {
            font-size: 62.5%; // 1rem = 10px
        }

        @include respond-desktop {
            font-size: 75%; //1rem = 12px
        }
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

    .btn__success {

        &:hover {
            background: var(--color-green-primary);  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, var(--color-green-secondary), var(--color-green-primary));  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, var(--color-green-secondary), var(--color-green-primary)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }
    }

    :root {
        --color-blue-primary-light: #4ddeff;
        --color-blue-primary: #00d2ff;
        --color-blue-primary-dark: #00a7cc;

        --color-blue-secondary-light: #578edb;
        --color-blue-secondary: #3a7bd5;
        --color-blue-secondary-dark: #245ba8;

        --color-green-primary-light: #bdff99;
        --color-green-primary: #a8ff78;
        --color-green-primary-dark: #8bff4d;

        --color-green-secondary-light: #99ffe0;
        --color-green-secondary: #78ffd6;
        --color-green-secondary-dark: #33ffc2;
    }
</style>