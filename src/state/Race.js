import {competitionKeys} from "../data";
import LoggerService from "../service/Logger";

const loggerService = new LoggerService();

function getUsersLoggers(snapshot) {
  let loggers = [];
  if(snapshot.size > 0) {
    snapshot.forEach(doc => {
      loggers.push(doc.data().loggers);
    })
  }
  return loggers;
}

function getAllScores(state) {
  const loggerKeys = Object.keys(competitionKeys);
  const result = {};
  loggerKeys.map(key => {
    const x = state.racers.map(racer => {
      return racer[key] || 0;
    }) 
    result[key] = x;
  })
  return result; 
}

function getNextHighestScore(count, scores) {
  return scores.sort().find(score => score > count); 
}

export default {
  state: () => {
    return {
      racers: [],
    }
  },
  mutations: {
    SET_RACERS(state, data) {
      state.racers = data;
    },
  },
  actions: {
    setDoc({commit}, snapshot) {
      snapshot.forEach(doc => {
        commit("SET_DOC", doc);
      })
    },
    loadRacers({commit}) {
      loggerService.fetchAll().then((snapshot) => {
        const loggers = getUsersLoggers(snapshot);
        commit('SET_RACERS', loggers);
      });
    },
  },
  getters: {
    targetScores(state, getters, rootState) {
      const scores = getAllScores(state);
      const activeLoggers = getters.activeLoggers;

      const result = {};
      activeLoggers.forEach(({id, count}) => {
        result[id] = getNextHighestScore(count, scores[id]);
      })
      return result;
    }
  },
}