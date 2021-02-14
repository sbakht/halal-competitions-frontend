export default {
  state: () => {
    return {
      activeTabId: window.localStorage.getItem('activeTabId') || 'dhikr',
    }
  },
  mutations: {
    SET_ACTIVE_ID(state, data) {
      state.activeTabId = data;
      window.localStorage.setItem('activeTabId', data);
    },
  },
  actions: {
    setActiveTab({commit}, id) {
      commit('SET_ACTIVE_ID', id);
    },
  },
  getters: {
  },
}