<template>
    <div class="finder">
        <h1>This is the finder page</h1>
        <button @click="getState">show state data</button>
        <button @click="showLinks">show axios links</button>
        <!-- <button @click="updateServer">update the server</button> -->

        <search-bar></search-bar>

        <button @click="page--" :disabled="page === 1">prev page</button>
        <button @click="page++" :disabled="page === numOfPages ">next page</button>

        <ul class="finder__grid">
            <li v-for="(project, index) of getQueriedProjects.slice(projectIndices.start, projectIndices.end)" :key="index">
                <proj-overview :details="project" :viewWidth="viewWidth"></proj-overview>
            </li>
        </ul>

    </div>
</template>

<script>
    import axios from 'axios';
    import debounce from 'lodash/debounce';
    import ProjectOverview from '../components/ProjectOverview.vue';
    import SearchBar from '../components/Search/SearchBar.vue';

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
            getQueriedProjects() {
                return this.$store.getters.getQueriedProjects;
            },
            numOfProjects() {
                return this.getQueriedProjects.length;
            },
            numOfPages() {
                return Math.ceil(this.numOfProjects / this.resPerPage);
            },
            projectIndices() {
                let start = (this.page-1) * this.resPerPage;
                let end = this.page * this.resPerPage > this.numOfProjects ? this.numOfProjects : this.page * this.resPerPage //prevents invalud/overshot end index
                
                return { //es6 shorthand property name
                    start,
                    end 
                }
            }
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

                // now this route is rendering the queried array all the time, and on route creation (this route is kept alive) we set the queried array to be the whole project array
                this.$store.dispatch('setInitialQueriedProjects');
                
                console.log('completed projects');
            },
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

            //     let count = 1;

            //     while (result.data.projects.hasNext) { //recursively search for projects as there can only be 10 searches per request
            //         const newResult = await axios.get(`${this.projectsURL}&nextProjectId=${result.data.projects.nextProjectId}`);
            //         result = newResult;
            //         result.data.projects.project.forEach(element => {
            //             projects.push(element);
            //         });
            //         count++;
            //         console.log(count);
            //     }
                
            //     // ADD TO FIREBASE
            //     await axios.put('https://charity-finder-710a7.firebaseio.com/themes.json', themes);
            //     await axios.put('https://charity-finder-710a7.firebaseio.com/projects.json', projects);

            //     alert('Note: refreshing data now'); //letting user know before refreshing data in page
            //     this.getThemes();
            //     this.getProjects();
            // }
        },
        created() { //note the getThemes() and getProjects() are async functions but we are not handling the promise/awaiting it
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
            projOverview: ProjectOverview,
            searchBar: SearchBar
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