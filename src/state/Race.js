import firebase from "firebase/app";

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
    loadRacers({commit, rootState}) {
      const loggersRef = firebase.firestore().collection('loggers');
      const user = rootState.User.user;

      if(user) {
        loggersRef.where('lastUpdated', '>', user.lastUpdated).get().then((snapshot) => {
          commit('SET_RACERS', snapshot.map(doc => doc.data()))
        });
      }
    },
  },
  getters: {
  },
}