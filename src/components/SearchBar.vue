<template>
    <div class="search">
        <p class="search__title">Search projects by:</p>

        <input type="text" placeholder="Text" v-model="searchText">
        <input type="text" placeholder="Country" v-model="searchCountry">
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                searchText: '',
                searchCountry: ''
            }
        },
        watch: {
            searchText(newVal) {
                this.$store.dispatch('changeTextQuery', this.searchText);
                this.$store.dispatch('filterProjects');
            },
            searchCountry(newVal) {
                this.$store.dispatch('changeCountryQuery', this.searchCountry);
                this.$store.dispatch('filterProjects');
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>