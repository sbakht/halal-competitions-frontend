import { competitionsJSON, competitionKeys } from "../data";
import LoggerService from '../service/Logger';

const loggerService = new LoggerService();

function addUntrackedLoggers(loggers) {
  competitionsJSON.forEach(comp => Object.keys(comp.counters).forEach(loggerId => {
    if (!loggers.hasOwnProperty(loggerId)) {
      loggers[loggerId] = 0;
    }
  }))
}

function getNextHighestScore(count, scores) {
  return scores.sort().find(score => score > count);
}

function getLoggers(docs) {
  return (docs.length && docs[0].data().loggers) || {};
}

export default {
  namespaced: true,
  state: () => {
    return {
      loggers: [],
      allLoggers: [],
      loadedDashboard: false,
      loadedStats: false,
    }
  },
  mutations: {
    INCREMENT(state, data) {
      state.loggers[data.id] = state.loggers[data.id] + 1;
    },
    SET_LOGGERS(state, data) {
      state.loggers = data;
    },
    SET_ALL_LOGGERS(state, data) {
      state.allLoggers = data;
    },
    SET_LOADED(state, data) {
      state.loadedDashboard = data;
    },
    SET_STATS_LOADED(state, data) {
      state.loadedStats = data;
    }
  },
  actions: {
    increment({ commit }, logger) {
      // TODO: reset listener to auto reset on new week
      commit('INCREMENT', logger);
    },
    loadDashboard({ dispatch, commit, rootState }) {
      commit("SET_MOBILE_MENU", false, { root: true })

      const userid = rootState.User.userid;

      if (userid) {
        loggerService.fetchById(userid).then(({ docs }) => {
          const loggers = getLoggers(docs);
          addUntrackedLoggers(loggers);
          commit('SET_LOGGERS', loggers);
          commit('SET_LOADED', true);
          dispatch('loadRacers', null, { root: true })
        });
      }
    },
    loadStats({ commit, rootState }) {
      commit("SET_MOBILE_MENU", false, { root: true })

      const userid = rootState.User.userid;

      if (userid) {
        loggerService.fetchAllById(userid).then(({ docs }) => {
          const loggers = docs.map(doc => doc.data().loggers);
          commit('SET_ALL_LOGGERS', loggers);
          commit('SET_STATS_LOADED', true);
        });
      }
    },
    save(obj) {
      loggerService.save(obj);
    },
  },
  getters: {
    activeLoggers(state, getters, rootState, rootGetters) {
      const scores = rootGetters.scores;

      const newIds = Object.keys(state.loggers).filter(id => competitionKeys[id].competition === rootState.Tab.activeTabId);
      return newIds.map(id => {
        const count = state.loggers[id];
        return {
          id,
          title: competitionKeys[id].title,
          count,
          target: getNextHighestScore(count, scores[id])
        };
      });
    },
    isDashboardLoaded(state) {
      return state.loadedDashboard;
    },
  },
}