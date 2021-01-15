import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import moment from 'moment';


function getStartWeek() {
  // return "01042021"
  const x = moment.utc().day(1);
  return x.format('MMDDYYYY');
}

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
    userId: '',
    users: [],
    loggers: [],
    competitions: [],
    week: getStartWeek(),
    allLoggers: {},
  },
  mutations: {
    SET_COMPETITIONS(state, data) {
      state.competitions = data;
    },
    SET_USER(state, data) {
      state.user = data;
    },
    SET_USERS(state, data) {
      state.users = data;
    },
    SET_USERID(state, data) {
      state.userId = data;
    },
    SET_LOGGERS(state, data) {
      state.loggers = data;
    },
    INCREMENT(state, data) {
      const index = state.loggers.indexOf(data);
      Vue.set(state.loggers[index], 'count', state.loggers[index].count + 1);
    },
    SET_LOGGERID(state, {oldLogger, newLogger}) {
      const index = state.loggers.indexOf(oldLogger);
      Vue.set(state.loggers[index], '_id', newLogger._id)
    },
    SET_ALL_LOGGERS(state, data) {
      state.allLoggers = data;
    },
    SET_WEEK(state, data) {
      state.week = data;
    }
  },
  actions: {
    loadDashboard({commit}) {
      commit('SET_WEEK', getStartWeek());
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
        commit('SET_USERID', userId);
        commit('SET_LOGGERS', loggers);
      });
    },
    loadResults({commit}) {
      axios.get("http://localhost:3001/api/loggers").then(({data}) => {
        commit('SET_ALL_LOGGERS', data);
      })
      axios.get("http://localhost:3001/api/competitions").then(({data}) => {
        commit('SET_COMPETITIONS', data);
      })
      axios.get("http://localhost:3001/api/users").then(({data}) => {
        commit('SET_USERS', data);
      })
    },
    save({commit}, logger) {
      if(logger._id) {
        axios.put("http://localhost:3001/api/loggers", logger);
      }else{
        axios.post("http://localhost:3001/api/loggers", logger).then(response => {
          commit('SET_LOGGERID', {oldLogger: logger, newLogger: response.data});
        });
      }
    },
    increment({commit, state, dispatch}, logger) {
      if(state.week === getStartWeek()) {
        commit('INCREMENT', logger);
      }else{
        dispatch('loadDashboard');
      }
    }
  },
  getters: {
    currentLoggers(state) {
      const loggers = state.loggers;
      const week = state.week;
      return loggers.filter((logger) => logger.week === week);
    },
    // currentLoggersForAllUsers(state) {
    //   const loggers = state.allLoggers;
    //   const week = state.week;
    //   return loggers.filter((logger) => logger.week === week);
    // },
    resultsByUsers(state) {
      const loggersByUser = state.users.map(({_id, displayName}) => {
        return {userId: _id, displayName, loggers: state.allLoggers.filter(logger => logger.user === _id)};
      })
      return loggersByUser;
    }
  }
})
