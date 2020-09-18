<template>
    <div class="main">
        <heading></heading>
        <about @on-about="emitToApp"></about>
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
        },
        methods: {
            emitToApp($event) { //tells app that nav is on "about" section, received from about view component
                this.$emit('on-about', $event);
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>