<template>
    <div class="finder">
        <h1>This is the finder page</h1>
        <button @click="getData">show state data</button>
        <button @click="showLinks">show axios links</button>
        <button @click="getProjects">add projects to firebase</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data: function() {
            return {
                apiData: 'nothing'
            }
        },
        computed: {
            themeURL() {
                return this.$store.getters.getUrl('themes');
            },
            projectsURL() {
                return this.$store.getters.getUrl('projects');
            }
        },
        methods: {
            async getData() {
                console.log(this.$store.state);
            },
            showLinks() {
                console.log(this.themeURL);
                console.log(this.projectsURL);
            },
            async getThemes() {
                // const result = await axios.get(this.themeURL);
                // const themes = [];
                // for (const theme of result.data.themes.theme) {
                //     themes.push(theme.name);
                // }

                // // TRIAL: ADD TO FIREBASE
                // await axios.put('https://charity-finder-710a7.firebaseio.com/themes.json', themes);

                // this.$store.dispatch('addThemes', themes);

                // FIREBASE RETRIEVING
                console.log('retrieving themes');

                const themesObj = await axios.get('https://charity-finder-710a7.firebaseio.com/themes.json');
                this.$store.dispatch('addThemes', themesObj.data);

                console.log('completed themes');
            },
            async getProjects() {
                // console.log('fetching projects');

                // const projects = []; //array of ALL projects to be committed to state
                // let result = await axios.get(this.projectsURL); //first round of query
                // result.data.projects.project.forEach(element => {
                //     projects.push(element);
                // });

                // let count = 1; 

                // while (result.data.projects.hasNext) { //recursively search for projects as there can only be 10 searches per request
                //     const newResult = await axios.get(`${this.projectsURL}&nextProjectId=${result.data.projects.nextProjectId}`);
                //     result = newResult;
                //     result.data.projects.project.forEach(element => {
                //         projects.push(element);
                //     });
                //     count++;
                //     console.log(count);
                // }

                // // TRIAL: ADD TO FIREBASE
                // await axios.put('https://charity-finder-710a7.firebaseio.com/projects.json', projects);

                // // this.$store.dispatch('addProjects', projects);
                // console.log('completed!');

                // FIREBASE RETRIEVING
                console.log('retrieving projects');

                const projectsObj = await axios.get('https://charity-finder-710a7.firebaseio.com/projects.json');
                this.$store.dispatch('addProjects', projectsObj.data);

                console.log('completed projects');
            }
        },
        created() {
            // get themes
            this.getThemes();

            // get all projects
            this.getProjects();
        }
    }
</script>

<style lang="scss" scoped>

</style>