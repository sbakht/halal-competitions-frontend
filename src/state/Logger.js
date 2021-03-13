import { dateRange } from "../utils.js";
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
    SET_LOADEDDASHBOARD(state, data) {
      state.loadedDashboard = data;
    }
  },
  actions: {
    increment({commit}, logger) {
      // TODO: reset listener to auto reset on new week
      commit('INCREMENT', logger);
    },
    loadDashboard({commit, dispatch, rootState}) {
      commit("SET_MOBILE_MENU", false)

      const loggersRef = loggerService.getRef();
      const userid = rootState.User.userid;

      if(userid) {
        const {start, end} = dateRange();
        loggersRef.where('userid', '==', userid).where('created', '>=', start).where('created', '<', end).limit(1).get().then(({docs}) => {
          loggerService.setDoc(docs[0]);

          addUntrackedLoggers(getLoggers(docs));
          commit('SET_LOGGERS', getLoggers(docs));
          commit('SET_LOADEDDASHBOARD', true);
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
  },
}