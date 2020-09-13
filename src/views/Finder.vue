<template>
    <div class="finder">
        <h1>This is the finder page</h1>
        <button @click="getState">show state data</button>
        <button @click="showLinks">show axios links</button>
        <!-- <button @click="updateServer">update the server</button> -->

        <search-bar @changed-query="page = 1" :projectsLoaded="projectsLoaded"></search-bar>

        <div class="finder__pagination" v-if="numOfPages > 1">
            <button @click="page--" :disabled="page === 1" class="btn finder__pagination-btn">Previous page</button>
            <p class="finder__current-page">{{ page }} of {{ numOfPages }}</p>
            <button @click="page++" :disabled="page === numOfPages" class="btn finder__pagination-btn">next page</button>
        </div>

        <transition name="loader" v-if="!projectsLoaded" mode="out-in">
            <div class="finder__loader">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-loader finder__loader-icon" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <line x1="12" y1="6" x2="12" y2="3" />
                    <line x1="16.25" y1="7.75" x2="18.4" y2="5.6" />
                    <line x1="18" y1="12" x2="21" y2="12" />
                    <line x1="16.25" y1="16.25" x2="18.4" y2="18.4" />
                    <line x1="12" y1="18" x2="12" y2="21" />
                    <line x1="7.75" y1="16.25" x2="5.6" y2="18.4" />
                    <line x1="6" y1="12" x2="3" y2="12" />
                    <line x1="7.75" y1="7.75" x2="5.6" y2="5.6" />
                </svg>
            </div>
        </transition>
        <transition name="error" v-else-if="getQueriedProjects.length === 0 && projectsLoaded" mode="out-in">
            <p class="finder__error">Sorry, no results found</p>
        </transition>
        <transition-group v-else tag="ul" class="finder__grid" name="grid">
            <li v-for="project of getQueriedProjects.slice(projectIndices.start, projectIndices.end)" :key="project.id">
                <proj-overview :details="project" :viewWidth="viewWidth" @changed-query="page = 1"></proj-overview>
            </li>
        </transition-group>
    </div>
</template>

<script>
    import axios from 'axios';
    import debounce from 'lodash/debounce';
    import ProjectOverview from '../components/Project/ProjectOverview.vue';
    import SearchBar from '../components/Search/SearchBar.vue';

    export default {
        data: function() {
            return {
                apiData: 'nothing',
                page: 1,
                resPerPage: 10,
                viewWidth: window.innerWidth,
                projectsLoaded: false
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
                let end = this.page * this.resPerPage > this.numOfProjects ? this.numOfProjects : this.page * this.resPerPage //prevents invalid/overshot end index
                
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

                this.projectsLoaded = true; //to remove spinning loader icon
                
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
    @import "../styles/animations.scss";

    .finder {

        &__pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 2rem 0;
        }

        &__pagination-btn {
            padding: .7rem 1rem;
            border-radius: .7rem;
            text-transform: uppercase;
            transition: all .3s;

            &:hover {
                transform: translateY(-2px) scale(1.05);
                box-shadow: 0 .5rem 1rem rgba(0,0,0, .7);
            }

            &:active {
                transform: translateY(-1px) scale(1.02);
                box-shadow: 0 .5rem .7rem rgba(0,0,0, .7);
            }
        }

        &__current-page {
            margin: 0 1.5rem;
            font-size: 1.6rem;
        }

        &__loader {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__loader-icon {
            animation: infiniteRotation .7s infinite;
            width: 7.5rem;
            height: 7.5rem;
        }

        &__error {
            font-size: 2.4rem;
            display: inline-block;
        }

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

    .loader-enter, .loader-leave-to {
        transform: translate(-50%, 0);
        opacity: 0;
    }

    .loader-enter-active, .loader-leave-active {
        transition: all 1s;
    }

    .error-enter, .error-leave-to {
        transform: scale(.85);
        opacity: 0;
    }

    .error-enter-active, .error-leave-active {
        transition: all 1s;
    }

    .grid-enter, .grid-leave-to {
        opacity: 0;
        transform: scale(.85);
    }

    .grid-enter-active, .grid-leave-active {
        transition: all .8s;
    }

    .grid-leave-active {
        position: absolute;
    }
    
    .grid-move {
        transition: transform .8s;
    }
</style>