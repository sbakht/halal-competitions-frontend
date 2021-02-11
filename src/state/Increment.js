export default {
  state: () => {
    return {
      loggers: [],
    }
  },
  mutations: {
    INCREMENT(state, data) {
      state.loggers[data.id] = state.loggers[data.id] + 1;
    },
  },
  actions: {
    increment({commit}, logger) {
      // TODO: reset listener to auto reset on new week
      commit('INCREMENT', logger);
    },
  },
  getters: {
  },
}