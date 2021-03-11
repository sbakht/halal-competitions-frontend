import firebase from "firebase/app";
import { dateRange } from "../utils.js";
import {competitionsJSON, competitionKeys} from "../data";

function addUntrackedLoggers(loggers) {
  competitionsJSON.forEach(comp => Object.keys(comp.counters).forEach(loggerId => {
      if(!loggers.hasOwnProperty(loggerId)) {
        loggers[loggerId] = 0;
      }
  }))
}

function getUsersLoggers(snapshot) {
  let loggers;
  if(snapshot.size === 0) {
    loggers = {};
  }else{
    snapshot.forEach(doc => {
      loggers = doc.data().loggers;
    })
  }
  return loggers;
}

export default {
  state: () => {
    return {
      loggers: [],
      doc: null,
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
    SET_DOC(state, data) {
      state.doc = data;
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
    setDoc({commit}, snapshot) {
      snapshot.forEach(doc => {
        commit("SET_DOC", doc);
      })
    },
    loadDashboard({commit, dispatch, rootState}) {
      commit("SET_MOBILE_MENU", false)

      const loggersRef = firebase.firestore().collection('loggers');
      const userid = rootState.User.userid;

      if(userid) {
        const {start, end} = dateRange();
        loggersRef.where('userid', '==', userid).where('created', '>=', start).where('created', '<', end).get().then((snapshot) => {

          const loggers = getUsersLoggers(snapshot);
          addUntrackedLoggers(loggers);

          dispatch('setDoc', snapshot)
          commit('SET_LOGGERS', loggers);
          commit('SET_LOADEDDASHBOARD', true);
        });
      }
    },
    save({commit, state, rootState}) {
      const loggersRef = firebase.firestore().collection('loggers');
      // TODO change email to username
        debugger;
      if(state.doc) {
        loggersRef.doc(state.doc.id).update({loggers: state.loggers, lastUpdated: firebase.firestore.Timestamp.now()})
      }else{
        loggersRef.add({
          username: rootState.User.username,
          userid: rootState.User.userid,
          loggers: state.loggers,
          created: firebase.firestore.Timestamp.now(),
          lastUpdated: firebase.firestore.Timestamp.now(),
        }).then(ref => {
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