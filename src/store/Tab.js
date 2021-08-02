import LocalStorage from '../utils/LocalStorage'

export default {
  namespaced: true,
  state: () => {
    return {
      activeTabId: LocalStorage.activeTabId.get(),
    }
  },
  mutations: {
    SET_ACTIVE_ID(state, data) {
      state.activeTabId = data;
      LocalStorage.activeTabId.set(data);
    },
  },
  actions: {
    setActiveTab({commit}, id) {
      commit('SET_ACTIVE_ID', id);
    },
  },
  getters: {
    activeTabId(state) {
      return state.activeTabId
    }
  },
}