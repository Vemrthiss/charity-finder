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
    // dateUpdated: ''
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
    // getLastUpdate: state => {
    //   return state.dateUpdated;
    // }
  },
  mutations: {
    addThemes(state, payload) {
      state.themes = payload;
    },
    addProjects(state, payload) {
      state.projects = payload;
    },
    changeDateUpdated(state, payload) {
      state.dateUpdated = payload;
    }
  },
  actions: {
    addThemes({commit}, payload) { //payload is a single array of theme strinsgs
      commit('addThemes', payload);
    },
    addProjects({commit}, payload) { //payload is a single array of project objects
      commit('addProjects', payload);
    },
    // changeDateUpdated({commit}, payload) {
    //   commit('changeDateUpdated', payload);
    // }
  }
})
