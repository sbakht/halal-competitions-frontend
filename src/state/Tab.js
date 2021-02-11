export default {
  state: () => {
    return {
      activeTabId: 'dhikr',
    }
  },
  mutations: {
    SET_ACTIVE_ID(state, data) {
      state.activeTabId = data;
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