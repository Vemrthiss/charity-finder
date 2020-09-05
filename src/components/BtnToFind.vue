<template>
    <button class="btn btn__success btn__to-find" @click="directToFinder">Find a project</button>
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
            transform: translateY(-.4rem);
            box-shadow: .5rem 1rem 1rem rgba(0,0,0, .5);
        }

        &:active {
            transform: translateY(-.2rem);
            box-shadow: .5rem .7rem 1rem rgba(0,0,0, .5);
        }
    }
</style>