import {competitionsJSON, competitionKeys} from "../data";
import LoggerService from '../service/Logger';

const loggerService = new LoggerService();

function addUntrackedLoggers(loggers) {
  competitionsJSON.forEach(comp => Object.keys(comp.counters).forEach(loggerId => {
      if(!loggers.hasOwnProperty(loggerId)) {
        loggers[loggerId] = 0;
      }
  }))
}

function getLoggers(docs) {
  return (docs.length && docs[0].data().loggers) || {};
}

export default {
  state: () => {
    return {
      loggers: [],
      loadedDashboard: false,
    }
  },
  mutations: {
    INCREMENT(state, data) {
      state.loggers[data.id] = state.loggers[data.id] + 1;
    },
    SET_LOGGERS(state, data) {
      state.loggers = data;
    },
    SET_LOADED(state, data) {
      state.loadedDashboard = data;
    }
  },
  actions: {
    increment({commit}, logger) {
      // TODO: reset listener to auto reset on new week
      commit('INCREMENT', logger);
    },
    loadDashboard({commit, rootState}) {
      commit("SET_MOBILE_MENU", false)

      const userid = rootState.User.userid;

      if(userid) {
        loggerService.fetch(userid).then(({docs}) => {
          addUntrackedLoggers(getLoggers(docs));
          commit('SET_LOGGERS', getLoggers(docs));
          commit('SET_LOADED', true);
        });
      }
    },
    save(obj) {
      loggerService.save(obj);
    },
  },
  getters: {
    activeLoggers(state, getters, rootState) {
      const newIds = Object.keys(state.loggers).filter(id => competitionKeys[id].competition === rootState.Tab.activeTabId);
      return newIds.map(id => ({ id, title: competitionKeys[id].title, count: state.loggers[id]}));
    },
    isDashboardLoaded(state) {
      return state.loadedDashboard;
    }
  },
}