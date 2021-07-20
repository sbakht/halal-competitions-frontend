import { dateRangeLastWeek, dateRange } from "../utils.js";
import { competitionsJSON, competitionKeys } from "../data";
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
    loadResults({ commit }) {
      const loggersRef = firebase.firestore().collection('loggers');
      const { start, end } = dateRangeLastWeek();
      loggersRef.where('lastUpdated', '>=', start).where('lastUpdated', '<', end).get().then((snapshot) => {

        console.assert(snapshot.size > 0, { snapshot, start, end });
        const data = [];
        snapshot.forEach(doc => data.push(doc.data()));

        // TODO REMOVE ONCE FIXED
        // function lastUpdated(item) {
        //   const x = item.lastUpdated.seconds;
        //   return x
        // }
        // const data2 = data.reduce((accum, doc) => {
        //   const found = accum.find(v => v.username === doc.data().username);
        //   if (!found) {
        //     const found = data.filter(v => v.data().username === doc.data().username);
        //     found.sort((v1, v2) => {
        //       if (lastUpdated(v1.data()) >= lastUpdated(v2.data())) {
        //         return -1
        //       }
        //       return 1;
        //     })

        //     // const test = found.map(d => d.data())
        //     // console.log(test);
        //     for (let i = 1; i < found.length; i++) {
        //       const item = found[i]
        //       console.log(item.data())
        //       // console.log(item.data().username);
        //       item.ref.delete();
        //       // loggersRef.doc(item.ref()).delete().then(() => {
        //       //   console.log("Document successfully deleted!");
        //       // }).catch((error) => {
        //       //   console.error("Error removing document: ", error);
        //       // });
        //     }

        //     return [...accum, found[0].data()]
        //   }
        //   return accum;
        // }, []);

        commit('SET_RESULTS', data);
        commit("SET_LOADED", true);
      });
    },
    loadChallenges({ commit }) {
      const loggersRef = firebase.firestore().collection('loggers');
      const { start, end } = dateRange();
      loggersRef.where('lastUpdated', '>=', start).where('lastUpdated', '<', end).get().then((snapshot) => {

        console.assert(snapshot.size > 0, { snapshot, start, end });
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
        if (data.length) {
          orderedLoggersByScore[competitionKey] = data;
        }
      })
      const { start, end } = dateRangeLastWeek();
      return {
        start, end,
        data: filterToActive(orderedLoggersByScore, rootState.Tab.activeTabId)
      }
    },
    totalCum(state) {
      const keys = Object.keys(competitionKeys);
      const totals = {};
      keys.forEach(competitionKey => {
        const data = orderedLoggerByScore(competitionKey, state.results).reduce((accum, user) => accum + (user.count || 0), 0);
        totals[competitionKey] = data;
      })
      const { start, end } = dateRange();
      return {
        start, end,
        data: totals
      }
    }
  },
}

function getCountBy(user, competitionKey) {
  return { username: user.username, count: user.loggers[competitionKey] };
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
    if (activeKeys.indexOf(key) > -1) {
      result.push({ title: getTitleFromKey(key), users: loggers[key] });
    }
  });
  return result;
}