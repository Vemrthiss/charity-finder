<template>
    <div class="about" id="about">
            <p>Ever wanted to donate to a charitable cause?</p>
            <p>Would you like to be part of a bigger movement to help others?</p>
            <p>Click the button below to use our search engine to find a project that resonates with you!</p>

            <to-find></to-find>
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
    
</style>