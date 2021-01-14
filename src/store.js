import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

function addMissingLoggers({competitions, userId, loggers, week}) {
  const counterIds = competitions.map(comp => comp.counters.map(c => c._id)).flat();

  counterIds.forEach(counterId => {
    const logger = loggers.find(l => l.week === week && l.counter === counterId);
    if(!logger) {
      loggers.push({
        count: 0,
        week,
        counter: counterId,
        user: userId,
      })
    }
  })
}


export default new Vuex.Store({
  state: {
    user: {data: []},
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
    loadDashboard({commit}) {
      Promise.all([
        axios.get("http://localhost:3001/api/competitions"),
        axios.get("http://localhost:3001/api/users/5fb16f25060eca135194d50a"),
      ]).then((responses) => {
        const competitions = responses[0].data;
        const user = responses[1].data;

        const userId = user._id;
        const loggers = user.data;
        const week = this.state.week;

        addMissingLoggers({competitions, userId, loggers, week});

        commit('SET_COMPETITIONS', competitions);
        commit('SET_USER', user);
      });
    },
  },
  getters: {
    currentLoggers(state) {
      const loggers = state.user.data;
      const week = state.week;
      return loggers.filter((logger) => logger.week === week);
    }
  }
})
