import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { groupBy, dateRange } from "./utils.js";
import {competitionsJSON, competitionKeys} from "./data";
import firebase from "firebase/app";
import User from './state/User'
import View from './state/View'
import Tab from './state/Tab'
import Increment from './state/Increment'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    View,
    Tab,
    // Increment
  },
  state: {
    users: [],
    loggers: [],
    competitions: competitionsJSON, // TODO do we need this in state?
    allLoggers: {},
  },
  mutations: {
    SET_COMPETITIONS(state, data) {
      state.competitions = data;
    },
    SET_USERS(state, data) {
      state.users = data;
    },
    SET_LOGGERS(state, data) {
      state.loggers = data;
    },
    INCREMENT(state, data) {
      state.loggers[data.id] = state.loggers[data.id] + 1;
      // Vue.set(state.loggers[data.id], state.loggers[data.id].count + 1);
    },
    SET_LOGGERID(state, {oldLogger, newLogger}) {
      const index = state.loggers.indexOf(oldLogger);
      Vue.set(state.loggers[index], '_id', newLogger._id)
    },
    SET_ALL_LOGGERS(state, data) {
      state.allLoggers = data;
    },
    SET_DOC(state, data) {
      state.doc = data;
    },
  },
  actions: {
    loadDashboard({commit, state, dispatch}) {
      commit("SET_MOBILE_MENU", false)

      const loggersRef = firebase.firestore().collection('loggers');
      const userid = state.User.userid;

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
            commit('SET_DOC', doc);
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
    loadResults({commit, state}) {
      axios.get("http://localhost:3001/api/loggers").then(({data}) => {
        commit('SET_ALL_LOGGERS', data);
      })
      axios.get("http://localhost:3001/api/competitions").then(({data}) => {
        commit('SET_COMPETITIONS', data);
      })
      axios.get("http://localhost:3001/api/users").then(({data}) => {
        commit('SET_USERS', data);
      })
    },
    save({commit, state}) {
      const loggersRef = firebase.firestore().collection('loggers');
      if(state.doc) {
        loggersRef.doc(state.doc.id).update({loggers: state.loggers})
      }else{
        loggersRef.add({userid: state.User.userid, loggers: state.loggers, date: firebase.firestore.Timestamp.now()}).then(ref => {
          commit("SET_DOC", ref);
        })
      }
    },
    increment({commit, state, dispatch}, logger) {
      // TODO: reset listener to auto reset on new week
      commit('INCREMENT', logger);
    },
    register({}, {username, password}) {
      return firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((userCredential) => {
          var user = userCredential.user;
        });
    },
  },
  getters: {
    activeLoggers(state) {
      const newIds = Object.keys(state.loggers).filter(id => competitionKeys[id].competition === state.Tab.activeTabId);
      return newIds.map(id => ({ id, title: competitionKeys[id].title, count: state.loggers[id]}));
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
      state.competitions.find( (comp) => comp.id === state.Tab.activeTabId) || {};
    },
  }
})
