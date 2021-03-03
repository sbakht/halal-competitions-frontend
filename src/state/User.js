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
      user: null,
      userid: window.localStorage.getItem('userid'),
      username: window.localStorage.getItem('username'),
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
        state.username = null;
        window.localStorage.removeItem('userid')
      }
    },
    SET_USERNAME(state, name) {
      state.username = name;
      window.localStorage.setItem('username', name)
    }
  },
  actions: {
    setUser({commit}, user = null) {
      commit("SET_USER", user)
    },
    login({dispatch, commit}, {email, password}) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            getUsername(userCredential.user).then((username) => {
              userCredential.user.username = username;
              commit('SET_USERNAME', username);
              dispatch('setUser', userCredential.user);
            })
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