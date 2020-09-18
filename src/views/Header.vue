<template>
    <div class="header">
        <div class="header__text">
            <h1 class="header__heading">Stifind</h1>
            <h2 class="header__title">be a part of the solution</h2>
            <to-find></to-find>
        </div>
    </div>
</template>

<script>
    import toFind from '../components/BtnToFind.vue';

    export default {
        components: {
            toFind
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/mixins.scss';

    .header {
        background: var(--color-blue-primary);  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, var(--color-blue-secondary), var(--color-blue-primary));  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, var(--color-blue-secondary), var(--color-blue-primary)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: white;
        text-align: center;
        height: 85vh;
        clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%);
        position: relative;

        &__text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: max-content;
        }

        &__heading {
            font-size: 3.3rem;
            font-weight: 300;
            letter-spacing: 1.5px;
            text-transform: uppercase;

            @include respond-laptop {
                font-size: 3.5rem;
            }
        }

        &__title {
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 5rem;
        }
    }
</style>