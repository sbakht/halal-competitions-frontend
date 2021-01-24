import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import dayjs from 'dayjs';
import { groupBy } from "./utils.js";


function getStartWeek() {
  return "01252021"
  const day = dayjs().day()
  if(day === 0) {
    return dayjs().day(-6).format('MMDDYYYY')
  }
  return dayjs().day(1).format('MMDDYYYY')
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
    token: window.localStorage.getItem('token'),
    isMobileMenuOpen: false
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
      if(data) {
        window.localStorage.setItem('token', data);
        state.token = data;
      }else{
        window.localStorage.clear();
        state.token = '';
      }
    },
    SET_MOBILE_MENU(state, data) {
      state.isMobileMenuOpen = data;
    }
  },
  actions: {
    loadDashboard({commit, state}) {
      commit("SET_MOBILE_MENU", false)
      commit('SET_WEEK', getStartWeek());
      Promise.all([
        axios.get("http://localhost:3001/api/competitions"),
        axios.get("http://localhost:3001/api/user", { headers: {authorization: 'Bearer ' + state.token }}),
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
      commit("SET_MOBILE_MENU", false)
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
        axios.put("http://localhost:3001/api/loggers", logger, { headers: {authorization: 'Bearer ' + state.token }});
      }else{
        axios.post("http://localhost:3001/api/loggers", logger, { headers: {authorization: 'Bearer ' + state.token }}).then(response => {
          commit('SET_LOGGERID', {oldLogger: logger, newLogger: response.data});
        });
      }
    },
    increment({commit, state, dispatch}, logger) {
      commit("SET_MOBILE_MENU", false)
      if(state.week === getStartWeek()) {
        commit('INCREMENT', logger);
      }else{
        dispatch('loadDashboard');
      }
    },
    setActiveTab({commit}, id) {
      commit("SET_MOBILE_MENU", false)
      commit('SET_ACTIVE_ID', id);
    },
    register({},{username, password}) {
      return axios.post('http://localhost:3001/api/users', {username, password});
    },
    login({commit},{username, password}) {
      return axios.post('http://localhost:3001/login', {username, password}).then(({data}) => {
        commit("SET_TOKEN", data.accessToken)
      });
    },
    logout({commit}) {
      commit("SET_MOBILE_MENU", false)
      commit("SET_TOKEN", '')
    },
    openMobileMenu({commit}) {
      commit("SET_MOBILE_MENU", true)
    },
    closeMobileMenu({commit}) {
      commit("SET_MOBILE_MENU", false)
    }
  },
  getters: {
    currentLoggers(state) {
      const loggers = state.loggers;
      const week = state.week;
      return loggers.filter((logger) => logger.week === week);
    },
    resultsByUsers(state) {
      const loggersByUser = state.users.map(({_id, displayName}) => {
        return {userId: _id, displayName, loggers: state.allLoggers.filter(logger => logger.user === _id)};
      })
      return loggersByUser;
    },
    loggersByWeek(state) {
      const loggers = state.allLoggers;
      const grouped = groupBy(loggers, "week");

      return Object.keys(grouped).map((week) => {
        const loggers = grouped[week]
        const obj = groupBy(loggers, "counter");
        return {week, loggers: obj}
      }).sort((a, b) => {
        const s1 = a.week;
        const s2 = b.week;

        const y1 = s1.substr(4,7)
        const y2 = s2.substr(4,7)
        if(y1 > y2) {
          return -1;
        }
        
        const w1 = s1.substr(2,2)
        const w2 = s2.substr(2,2)
        if(w1 > w2) {
          return -1;
        }

        const d1 = s1.substr(0,2)
        const d2 = s2.substr(0,2)
        if(d1 > d2) {
          return -1;
        }
      });
    },
    activeCompetition(state) {
      return state.competitions.find( (comp) => comp._id === state.activeID) || {};
    },
    isLoggedIn(state) {
      return !!state.token;
    }
  }
})
