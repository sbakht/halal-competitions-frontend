import firebase from "firebase/app";
import { groupBy, dateRange } from "../utils.js";
import {competitionsJSON, competitionKeys} from "../data";

export default {
  state: () => {
    return {
      loggers: [],
      doc: null
    }
  },
  mutations: {
    INCREMENT(state, data) {
      state.loggers[data.id] = state.loggers[data.id] + 1;
    },
    SET_LOGGERS(state, data) {
      state.loggers = data;
    },
    SET_DOC(state, data) {
      state.doc = data;
    },
  },
  actions: {
    increment({commit}, logger) {
      // TODO: reset listener to auto reset on new week
      commit('INCREMENT', logger);
    },
    loadDashboard({commit, rootState}) {
      commit("SET_MOBILE_MENU", false)

      const loggersRef = firebase.firestore().collection('loggers');
      const userid = rootState.User.userid;

      if(userid) {
        const {start, end} = dateRange();
        loggersRef.where('userid', '==', userid).where('date', '>=', start).where('date', '<', end).get().then((querySnapshot) => {
          if(querySnapshot.size === 0) {
            const trackedLoggers = {};

            competitionsJSON.forEach(comp => Object.keys(comp.counters).forEach(loggerId => {
                trackedLoggers[loggerId] = 0;
            }))
            commit('SET_LOGGERS', trackedLoggers);
            return;
          }

          querySnapshot.forEach((doc) => {
            commit("SET_DOC", doc);
            const trackedLoggers = doc.data().loggers;

            competitionsJSON.forEach(comp => Object.keys(comp.counters).forEach(loggerId => {
              if(!trackedLoggers.hasOwnProperty(loggerId)) {
                trackedLoggers[loggerId] = 0;
              }
            }))

            commit('SET_LOGGERS', trackedLoggers);
          });
        });
      }
    },
    save({commit, state, rootState}) {
      const loggersRef = firebase.firestore().collection('loggers');
      if(state.doc) {
        loggersRef.doc(state.doc.id).update({loggers: state.loggers})
      }else{
        loggersRef.add({userid: rootState.User.userid, loggers: state.loggers, date: firebase.firestore.Timestamp.now()}).then(ref => {
          commit("SET_DOC", ref);
        })
      }
    },
  },
  getters: {
    activeLoggers(state, getters, rootState) {
      const newIds = Object.keys(state.loggers).filter(id => competitionKeys[id].competition === rootState.Tab.activeTabId);
      return newIds.map(id => ({ id, title: competitionKeys[id].title, count: state.loggers[id]}));
    },
  },
}