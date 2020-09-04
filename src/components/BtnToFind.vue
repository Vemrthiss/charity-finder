<template>
    <button class="btn btn__to-find" @click="directToFinder">Find a project</button>
</template>

<script>
    export default {
        methods: {
            directToFinder() {
                this.$router.push('/finder');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btn__to-find {
        padding: 1rem 2rem;
        border-radius: 3rem;
        text-transform: uppercase;
        transition: all .3s;

        &:hover {
            background: #a8ff78;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #78ffd6, #a8ff78);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #78ffd6, #a8ff78); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            transform: translateY(-.4rem);
            box-shadow: .5rem 1rem 1rem rgba(0,0,0, .5);
        }

        &:active {
            transform: translateY(-.2rem);
            box-shadow: .5rem .7rem 1rem rgba(0,0,0, .5);
        }
    }
</style>