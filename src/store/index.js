import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urlReqs: { // THESE LINKS NOT IN USE AS GETTING DATA FROM FIREBASE INSTEAD
      'getThemesAPI': `https://api.globalgiving.org/api/public/projectservice/themes?api_key=${process.env.VUE_APP_API_KEY}`,
      'getProjectsAPI': `https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${process.env.VUE_APP_API_KEY}`
    },
    themes: [],
    projects: [],
    queries: {
      text: '',
      country: '',
      themes: []
    },
    queriedProjects: []
  },
  getters: {
    getUrl: state => type => {
      const url = type === 'themes' ? 'getThemesAPI' : 'getProjectsAPI'; 
      return state.urlReqs[url];
    },
    getAllThemes: state => {
      return state.themes;
    },
    getAllProjects: state => {
      return state.projects;
    },
    getQueries: state => {
      return state.queries;
    },
    getQueriedProjects: state => {
      return state.queriedProjects;
    }
  },
  mutations: {
    addThemes(state, payload) {
      state.themes = payload;
    },
    addProjects(state, payload) {
      state.projects = payload;
    },
    setInitialQueriedProjects(state) { //for app/finder route initialisation
      state.queriedProjects = state.projects;
    },
    editQueries(state, payload) { //payload is an object specifying which query to edit/add and its (new) value
      state.queries[payload.queryType] = payload.query;
    },
    filterProjects(state) {
      const textQuery = state.queries.text;
      const countryQuery = state.queries.country;
      const themesQuery = state.queries.themes; //an array

      if (!textQuery && !countryQuery && themesQuery.length === 0) { //if there are NO queries, display all projects. empty strings are falsey. empty array is truthy, so use length check
        state.queriedProjects = state.projects;
      } else { // executed when there are SOME queries
        state.queriedProjects = state.projects.filter(proj => {
          let hasText, hasCountry, hasTheme;

          //must check if textQuery is empty else String.includes returns true
          //default setting: if there is NO text Query, this will be true for final check (see last line of this callback fn)
          hasText = textQuery ? proj.title.toLowerCase().includes(textQuery.toLowerCase()) : true;
          hasCountry = countryQuery ? proj.country.toLowerCase().includes(countryQuery.toLowerCase()) : true;

          if (themesQuery.length !== 0) { //if there are theme queries
            for (const theme of themesQuery) { // theme checking is an OR case, as long as 1 theme query is included in proj, this proj is queried
              for (const nameObj of proj.themes.theme) {
                if (nameObj.name === theme) { // [CASE SENSITIVE] checks if proj's themes array includes any theme, as long as it includes 1 of them, return true
                  hasTheme = true;
                  break; //this project has at least 1 queried theme ==> break the nearest for loop
                }
              }
              if (hasTheme) { //if hasTheme is already true for 1 iteration of a single queried theme, break the whole for loop for theme checking of this one project
                break;
              }
            }
            if (!hasTheme) { //executes when there are 0 matches of this project's themes to queried themes
              hasTheme = false; // need to do this as we are using a "let" variable, which has value of undefined if we don't do this. Although it is falsey, the last boolean statement will not work
            }
          } else {
            hasTheme = true;
          }

          // all 3 conditions must be fulfilled, those queries that are empty will have default value of true
          return hasText && hasCountry && hasTheme;
        });
      }
    }
  },
  actions: {
    addThemes({commit}, payload) { //payload is a single array of theme strinsgs
      commit('addThemes', payload);
    },
    addProjects({commit}, payload) { //payload is a single array of project objects
      commit('addProjects', payload);
    },
    setInitialQueriedProjects({commit}) {
      commit('setInitialQueriedProjects');
    },
    changeTextQuery({commit}, payload) { //payload is a string value to add/edit in the state.queries object
      const mutationPayload = {
        queryType: 'text',
        query: payload
      };
      commit('editQueries', mutationPayload);
    },
    changeCountryQuery({commit}, payload) { //payload is a string value to add/edit in the state.queries object
      const mutationPayload = {
        queryType: 'country',
        query: payload
      };
      commit('editQueries', mutationPayload);
    },
    editThemeQueries({commit}, payload) { //payload is an array of themes queries
      const mutationPayload = {
        queryType: 'themes',
        query: payload
      };
      commit('editQueries', mutationPayload);
    },
    filterProjects({commit}) {
      commit('filterProjects');
    }
  }
})
