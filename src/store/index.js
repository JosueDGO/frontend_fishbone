import { createStore } from 'vuex'
export default createStore({
  state: {
    user: {
      age: null,
      weight: null,
      height: null,
      gender: null,
      ethnicity: null,
    },
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
    },
  },
  actions: {
    setUserData({ commit }, userData) {
      commit('setUserData', userData);
    },
  },
  modules: {
  }
})
