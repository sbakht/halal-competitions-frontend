import { dateRangeLastWeek, dateRange } from "../utils.js";
import {competitionsJSON, competitionKeys} from "../data";
import firebase from "firebase/app";

export default {
  state: () => {
    return {
      results: [],
      loadedResults: false,
    }
  },
  mutations: {
    SET_RESULTS(state, data) {
      state.results = data;
    },
    SET_LOADED(state, data) {
      state.loadedResults = data;
    },
  },
  actions: {
    loadResults({commit}) {
      const loggersRef = firebase.firestore().collection('loggers');
      const {start, end} = dateRange();
      loggersRef.where('date', '>=', start).where('date', '<', end).get().then((snapshot) => {

        console.assert(snapshot.size > 0, {snapshot, start, end});
        const data = [];
        snapshot.forEach(doc => data.push(doc.data()));
        commit('SET_RESULTS', data);
        commit("SET_LOADED", true);
      });
    },
  },
  getters: {
    orderedByScore(state, getters, rootState) {
      const keys = Object.keys(competitionKeys);
      const orderedLoggersByScore = {};
      keys.forEach(competitionKey => {
        const data = orderedLoggerByScore(competitionKey, state.results);
        if(data.length) {
          orderedLoggersByScore[competitionKey] = data;
        }
      })
      const {start, end} = dateRangeLastWeek();
      return {
        start, end,
        data: filterToActive(orderedLoggersByScore, rootState.Tab.activeTabId)
      }
    }
  },
}

function getCountBy(user, competitionKey) {
  return {username: user.username, count: user.loggers[competitionKey]};
}

function sort(scores) {
  scores.sort((s1, s2) => {
    return s1.count >= s2.count ? -1 : 1;
  })
}

function orderedLoggerByScore(competitionKey, users) {
  const scores = users.map(user => {
    return getCountBy(user, competitionKey); 
  }).filter(user => user.count > 0)
  sort(scores);
  return scores;
}

function getKeysFor(compId) {
  return Object.keys(competitionsJSON.find(comp => comp.id === compId).counters)
}

function getTitleFromKey(id) {
  return competitionKeys[id].title;
}

function filterToActive(loggers, activeTabId) {
  let result = [];
  const activeKeys = getKeysFor(activeTabId);
  Object.keys(loggers).forEach(key => {
    if(activeKeys.indexOf(key) > -1) {
      result.push({title: getTitleFromKey(key), users: loggers[key]});
    }
  });
  return result;
}