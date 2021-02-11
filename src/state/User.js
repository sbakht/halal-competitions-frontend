import firebase from "firebase/app";

export default {
  state: () => {
    return {
      user: null,
      userid: window.localStorage.getItem('userid'),
    }
  },
  mutations: {
    SET_USER(state, user) {
      if(user) {
        state.user = user;
        state.userid = user.uid;
        window.localStorage.setItem('userid', user.uid)
      }else{
        state.user = null;
        state.userid = null;
        window.localStorage.removeItem('userid')
      }
    },
  },
  actions: {
    setUser({commit}, user = null) {
      commit("SET_USER", user)
    },
    login({dispatch}, {username, password}) {
      return firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
          dispatch('setUser', userCredential.user)
        });
    },
    logout({dispatch}) {
      firebase.auth().signOut().then(() => {
        dispatch('setUser');
      });
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.userid;
    }
  },
}