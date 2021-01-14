import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
function loggersByCounter(loggers, id) {
  return loggers.filter((c) => c.counter === id);
}

function loggerByWeek(loggers, week) {
  return loggers.find((logger) => logger.week === week);
}

export default new Vuex.Store({
  state: {
    user: {},
    competitions: [],
    week: 12132020,
  },
  mutations: {
    SET_COMPETITIONS(state, data) {
      state.competitions = data;
    },
    SET_USER(state, data) {
      state.user = data;
    }
  },
  actions: {
    loadDashboard({commit}, {competitions, user}) {
      const userId = user._id;
      const loggers = user.data;
      const week = this.state.week;

      competitions.forEach((comp) => {
        comp.counters.forEach((counter) => {
          counter.loggers = loggersByCounter(loggers, counter._id);

          const loggerForCurrentWeek = loggerByWeek(counter.loggers, week)
          if (!loggerForCurrentWeek) {
            counter.loggers.push({
              count: 0,
              week: week,
              counter: counter._id,
              user: userId,
            });
          }
        });
      });

      commit('SET_COMPETITIONS', competitions);
      commit('SET_USER', user);
    },
  }
})
