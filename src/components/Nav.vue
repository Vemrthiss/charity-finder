<template>
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/finder">Project Finder</router-link>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .nav {
        display: flex;
        justify-content: center;
        position: fixed;
        width: 100%;
    }
</style>