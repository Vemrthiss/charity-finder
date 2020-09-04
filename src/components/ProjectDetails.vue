<template>
    <div class="project">
        <p>title: {{ details.title }}</p>
        <p>problem: {{ details.need }}</p>
        <p>Location: {{ details.contactCity }}, {{ details.contactCountry }}</p>
        <p>activities: {{ details.activities }}</p>
        <p>goal: ${{ details.goal }}; remaining: ${{ details.remaining}}</p>
        <a :href="details.projectLink">Project Link</a>
        <a :href="details.contactUrl">Contact url</a>
        <a :href="details.additonalDocumentation">Additional documentation</a>
        <ul class="project__themes">
            <li v-for="theme of details.themes.theme" :key="theme.id">{{ theme.name }}</li>
        </ul>

        <ul class="project__donation-options">
            <li v-for="(donation, index) of details.donationOptions.donationOption" :key="index">{{ donation.amount }} {{ donation.description }}</li>
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