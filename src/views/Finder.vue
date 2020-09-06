<template>
    <div class="finder">
        <h1>This is the finder page</h1>
        <button @click="getState">show state data</button>
        <button @click="showLinks">show axios links</button>
        <!-- <button @click="updateServer">update the server</button> -->
        <!-- <p>Data last updated: {{ lastUpdate }}</p> -->



        <button @click="page--">prev page</button>
        <button @click="page++">next page</button>

        <ul class="finder__grid">
            <li v-for="(project, index) of getStateProjects.slice(projectIndices.start, projectIndices.end)" :key="index">
                <proj-overview :details="project" :viewWidth="viewWidth"></proj-overview>
            </li>
        </ul>

    </div>
</template>

<script>
    import axios from 'axios';
    import debounce from 'lodash/debounce';
    import ProjectOverview from '../components/ProjectOverview.vue';

    export default {
        data: function() {
            return {
                apiData: 'nothing',
                page: 1,
                resPerPage: 10,
                viewWidth: window.innerWidth
            }
        },
        computed: {
            themeURL() {
                return this.$store.getters.getUrl('themes');
            },
            projectsURL() {
                return this.$store.getters.getUrl('projects');
            },
            getStateProjects() {
                return this.$store.getters.getAllProjects;
            },
            projectIndices() {
                return {
                    start: (this.page-1) * this.resPerPage,
                    end: this.page * this.resPerPage
                }
            },
            // lastUpdate() {
            //     return this.$store.getters.getLastUpdate;
            // }
        },
        methods: {
            getState() {
                console.log(this.$store.state);
            },
            showLinks() {
                console.log(this.themeURL);
                console.log(this.projectsURL);
            },
            async getThemes() {
                // FIREBASE RETRIEVING
                console.log('retrieving themes');

                const themesObj = await axios.get('https://charity-finder-710a7.firebaseio.com/themes.json');
                this.$store.dispatch('addThemes', themesObj.data);

                console.log('completed themes');
            },
            async getProjects() {
                // FIREBASE RETRIEVING
                console.log('retrieving projects');

                const projectsObj = await axios.get('https://charity-finder-710a7.firebaseio.com/projects.json');
                this.$store.dispatch('addProjects', projectsObj.data);

                console.log('completed projects');
            },
            // async getLastDateUpdate() {
            //     // FIREBASE RETRIEVING
            //     console.log('retrieving date');

            //     const dateObj = await axios.get('https://charity-finder-710a7.firebaseio.com/date.json');
            //     this.$store.dispatch('changeDateUpdated', dateObj.data);

            //     console.log('completed date');
            // },
            // async updateServer() {
            //     console.log('update started');

            //     // UPDATE THEMES
            //     let result = await axios.get(this.themeURL);
            //     const themes = [];
            //     for (const theme of result.data.themes.theme) {
            //         themes.push(theme.name);
            //     }

            //     // UPDATE PROJECTS
            //     const projects = []; //array of ALL projects to be committed to state
            //     result = await axios.get(this.projectsURL); //first round of query
            //     result.data.projects.project.forEach(element => {
            //         projects.push(element);
            //     });

            //     while (result.data.projects.hasNext) { //recursively search for projects as there can only be 10 searches per request
            //         const newResult = await axios.get(`${this.projectsURL}&nextProjectId=${result.data.projects.nextProjectId}`);
            //         result = newResult;
            //         result.data.projects.project.forEach(element => {
            //             projects.push(element);
            //         });
            //     }
                
            //     // ADD TO FIREBASE
            //     await axios.put('https://charity-finder-710a7.firebaseio.com/themes.json', themes);
            //     await axios.put('https://charity-finder-710a7.firebaseio.com/projects.json', projects);

            //     let today = new Date();
            //     today = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
            //     await axios.put('https://charity-finder-710a7.firebaseio.com/date.json', today);

            //     alert('Note: refreshing data now'); //letting user know before refreshing data in page
            //     this.getThemes();
            //     this.getProjects();
            //     this.getLastDateUpdate();
            // }
        },
        created() {
            // get themes
            this.getThemes();

            // get all projects
            this.getProjects();

            // set up resize window event to pass currrent viewport width into project overview component as prop
            window.addEventListener('resize', debounce(()=> {
                this.viewWidth = window.innerWidth;
            }, 300));
        },
        components: {
            projOverview: ProjectOverview
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/mixins.scss";

    .finder {

        &__grid {
            display: grid;
            grid-template-columns: 100%; //so the grid items don't exceed the vw (for mobile esp)
            list-style: none;
            gap: 2rem;
            padding: 0;

            @include respond-laptop {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    }
</style>