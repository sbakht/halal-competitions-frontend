import firebase from "firebase/app";

export default {
  state: () => {
    return {
      racers: [],
      oldRacers: window.localStorage.getItem('updatedRacers') || []
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
    loadRacers({commit, rootState}) {
      const loggersRef = firebase.firestore().collection('loggers');
      const user = rootState.User.user;

      if(user) {
        loggersRef.where('lastUpdated', '>', user.lastUpdated).get().then((snapshot) => {
          const updatedRacers = snapshot.map(doc => doc.data());
          window.localStorage.setItem('oldRacers', window.localStorage.getItem('updatedRacers'))
          window.localStorage.setItem('updatedRacers', updatedRacers)
          commit('SET_RACERS', updatedRacers);
        });
      }
    },
  },
  getters: {
  },
}