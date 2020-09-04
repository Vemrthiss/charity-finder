<template>
    <div class="project">
        <p>title: {{ details.title }}</p>
        <p>Location: {{ details.contactCity }}, {{ details.contactCountry }}</p>
        <p>summary: {{ details.summary }}</p>
        <p>goal: ${{ details.goal }}; remaining: ${{ details.remaining}}</p>
        <img :src="details.imageLink" alt="project image">
        <a :href="details.projectLink">Project Link</a>
        <ul class="project__themes">
            <li v-for="theme of details.themes.theme" :key="theme.id">{{ theme.name }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            details: Object
        }
    }
</script>

<style lang="scss" scoped>

</style>