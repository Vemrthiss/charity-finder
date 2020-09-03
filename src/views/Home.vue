<template>
    <div class="main">
        <heading></heading>
        <about></about>
    </div>
</template>

<script>
    import Header from './Header.vue';
    import About from './About.vue';
    
    export default {
        name: 'Home',
        components: {
            heading: Header,
            about: About
        }
    }
</script>

<style lang="scss" scoped>
    
</style>