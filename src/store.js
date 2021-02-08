import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import dayjs from 'dayjs';
import { groupBy } from "./utils.js";
import firebase from "firebase/app";


function getStartWeek() {
  // return "01252021"
  const day = dayjs().day()
  if(day === 0) {
    return dayjs().day(-6).format('MMDDYYYY')
  }
  return dayjs().day(1).format('MMDDYYYY')
}

Vue.use(Vuex)

const keys = {
  dhikr_1: {
    competition: 'dhikr',
    title: 'SubhanAllah'
  },
  dhikr_2: {
    competition: 'dhikr',
    title: 'Alhamdulillah'
  },
  dhikr_3: {
    competition: 'dhikr',
    title: 'Allahu Akbar'
  },
  dhikr_4: {
    competition: 'dhikr',
    title: 'la ilaha ilAllah'
  },
  mindful_1: {
    competition: 'mindful',
    title: 'Listen to Quran'
  }
}

const competitionsJSON = [
  {
    id: 'dhikr',
    title: 'Tasbih',
    counters: {
      dhikr_1: {
        title: 'SubhanAllah'
      },
      dhikr_2: {
        title: 'Alhamdulillah'
      },
      dhikr_3: {
        title: 'Allahu Akbar'
      },
      dhikr_4: {
        title: 'la ilaha ilAllah'
      },
    }
  },
  {
    id: 'mindful',
    title: 'Mindful Minutes',
    counters: {
      mindful_1: {
        title: 'Listen to Quran'
      }
    }
  },
  {
    id: 'charity',
    title: 'Charity',
    counters: {
    }
  },
  {
    id: 'fitness',
    title: 'Fitness',
    counters: {
    }
  }
]

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
    keys: keys,
    userId: null,
    activeID: '',
    users: [],
    loggers: [],
    competitions: competitionsJSON,
    week: getStartWeek(),
    allLoggers: {},
    user: null,
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
    SET_WEEK(state, data) {
      state.week = data;
    },
    SET_ACTIVE_ID(state, data) {
      state.activeID = data;
    },
    SET_USER(state, user) {
      if(user) {
        state.user = user;
      }else{
        state.user = null;
      }
    },
    SET_DOC(state, data) {
      state.doc = data;
    },
    SET_MOBILE_MENU(state, data) {
      state.isMobileMenuOpen = data;
    }
  },
  actions: {
    loadDashboard({commit, state}) {
      commit("SET_MOBILE_MENU", false)
      commit('SET_WEEK', getStartWeek());

      const loggersRef = firebase.firestore().collection('loggers');
      const userid = state.user && state.user.uid;

      if(userid) {
        loggersRef.where('userid', '==', userid).where('week', '<', new Date(2021, 2, 2)).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            commit('SET_DOC', doc);
            const trackedLoggers = doc.data().count;

            competitionsJSON.forEach(comp => Object.keys(comp.counters).forEach(loggerId => {
              if(!trackedLoggers.hasOwnProperty(loggerId)) {
                trackedLoggers[loggerId] = 0;
              }
            }))

            commit('SET_LOGGERS', trackedLoggers);
          });
        });
      }

      if(!state.activeID) {
        commit('SET_ACTIVE_ID', competitionsJSON[0].id)
      }
    },
    loadResults({commit, state}) {
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
    save({commit, state}) {
      const loggersRef = firebase.firestore().collection('loggers');
      loggersRef.doc(state.doc.id).update({count: state.loggers})
    },
    increment({commit, state, dispatch}, logger) {
      if(state.week === getStartWeek()) {
        commit('INCREMENT', logger);
      }else{
        dispatch('loadDashboard');
      }
    },
    setActiveTab({commit}, id) {
      commit('SET_ACTIVE_ID', id);
    },
    register({}, {username, password}) {
      return firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((userCredential) => {
          var user = userCredential.user;
        });
    },
    login({dispatch}, {username, password}) {
      return firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch('setUser', user)
        });
    },
    setUser({commit}, user = null) {
      commit("SET_USER", user)
    },
    logout({dispatch}) {
      firebase.auth().signOut().then(() => {
        dispatch('setUser');
      });
    },
    openMobileMenu({commit}) {
      commit("SET_MOBILE_MENU", true)
    },
    closeMobileMenu({commit}) {
      commit("SET_MOBILE_MENU", false)
    }
  },
  getters: {
    activeLoggers(state) {
      const newIds = Object.keys(state.loggers).filter(id => state.keys[id].competition === state.activeID);
      return newIds.map(id => ({ id, count: state.loggers[id]}));
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
      state.competitions.find( (comp) => comp.id === state.activeID) || {};
    },
    isLoggedIn(state) {
      return !!state.user;
    }
  }
})
