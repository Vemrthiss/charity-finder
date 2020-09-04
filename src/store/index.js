import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urlReqs: {
      'getThemes': `https://api.globalgiving.org/api/public/projectservice/themes?api_key=${process.env.VUE_APP_API_KEY}`,
      'getProjects': `https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=${process.env.VUE_APP_API_KEY}`
    },
    themes: [],
    projects: []
  },
  getters: {
    getUrl: state => type => {
      const url = type === 'themes' ? 'getThemes' : 'getProjects'; 
      return state.urlReqs[url];
    },
    getAllThemes: state => {
      return state.themes;
    }
  },
  mutations: {
    addThemes(state, payload) {
      state.themes = payload;
    },
    addProjects(state, payload) {
      state.projects = payload;
    }
  },
  actions: {
    addThemes({commit}, payload) { //payload is a single array of theme strinsgs
      commit('addThemes', payload);
    },
    addProjects({commit}, payload) { //payload is a single array of project objects
      commit('addProjects', payload);
    }
  }
})
