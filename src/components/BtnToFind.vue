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
    }
</style>