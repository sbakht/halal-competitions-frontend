import firebase from "firebase/app";

function getUsername(user) {
  const usersRef = firebase.firestore().collection('users');
  let username;
  return usersRef.where('userid', '==', user.uid).get().then((snapshot) => {
    snapshot.forEach(doc => {
      username = doc.data().username;
    })
    return username;
  });
}

export default {
  state: () => {
    return {
      pendingAuth: true,
      user: null,
      userid: null,
    }
  },
  mutations: {
    SET_USER(state, user) {
      if(user) {
        state.user = user;
        state.userid = user.uid;
      }else{
        state.user = null;
        state.userid = null;
      }
    },
    SET_PENDING_AUTH(state, val) {
      state.pendingAuth = val;
    },
  },
  actions: {
    completeAuth({commit}) {
      commit("SET_PENDING_AUTH", false);
    },
    setUser({commit}, user = null) {
      commit("SET_USER", user)
    },
    login({dispatch}, {email, password}) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            dispatch('setUser', userCredential.user);
        });
    },
    register({dispatch}, {username, email, password}) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const usersRef = firebase.firestore().collection('users');
          usersRef.add({userid: userCredential.user.uid, username}).then(() => {
            // TODO dont allow duplicate username
            dispatch('login', {email, password})
          })
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