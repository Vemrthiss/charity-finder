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
        },
        beforeCreate() {
            const body = document.querySelector('body');
            body.classList.remove('body--finder');
        }
    }
</script>

<style lang="scss" scoped>
    
</style>