import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import moment from 'moment';
import { groupBy } from "./utils.js";


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
    activeID: '',
    users: [],
    loggers: [],
    competitions: [],
    week: getStartWeek(),
    allLoggers: {},
    token: '',
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
    },
    SET_ACTIVE_ID(state, data) {
      state.activeID = data;
    },
    SET_TOKEN(state, data) {
      state.token = 'Bearer ' + data;
    }
  },
  actions: {
    loadDashboard({commit, state}) {
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

        if(!state.activeID) {
          commit('SET_ACTIVE_ID', competitions[0]._id)
        }
        commit('SET_COMPETITIONS', competitions);
        commit('SET_USERID', userId);
        commit('SET_LOGGERS', loggers);
      });
    },
    loadResults({commit, state}) {
      axios.get("http://localhost:3001/api/loggers").then(({data}) => {
        commit('SET_ALL_LOGGERS', data);
      })
      axios.get("http://localhost:3001/api/competitions").then(({data}) => {
        if(!state.activeID) {
          commit('SET_ACTIVE_ID', data[0]._id)
        }
        commit('SET_COMPETITIONS', data);
      })
      axios.get("http://localhost:3001/api/users").then(({data}) => {
        commit('SET_USERS', data);
      })
    },
    save({commit, state}, logger) {
      if(logger._id) {
        axios.put("http://localhost:3001/api/loggers", logger, { headers: {authorization: state.token }});
      }else{
        axios.post("http://localhost:3001/api/loggers", logger, {authorization: state.token}).then(response => {
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
    },
    setActiveTab({commit}, id) {
      commit('SET_ACTIVE_ID', id);
    },
    register({},{username, password}) {
      return axios.post('http://localhost:3001/api/users', {username, password});
    },
    login({commit},{username, password}) {
      return axios.post('http://localhost:3001/api/login', {username, password}).then(({data}) => {
        commit("SET_TOKEN", data.accessToken)
      });
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
    },
    loggersByWeek(state) {
      const loggers = state.allLoggers;
      const grouped = groupBy(loggers, "week");

      Object.keys(grouped).map((key) => {
        const obj = groupBy(grouped[key], "counter");
        grouped[key] = obj;
      });
      return grouped;
    },
    activeCompetition(state) {
      return state.competitions.find( (comp) => comp._id === state.activeID) || {};
    },
    isLoggedIn(state) {
      return !!state.token;
    }
  }
})
