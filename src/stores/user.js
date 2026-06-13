import { defineStore } from 'pinia'
import firebase from 'firebase/app'

export const useUserStore = defineStore('user', {
  state: () => ({
    pendingAuth: true,
    user: null,
    userid: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.userid,
  },
  actions: {
    completeAuth() {
      this.pendingAuth = false
    },
    setUser(user = null) {
      if (user) {
        this.user = user
        this.userid = user.uid
      } else {
        this.user = null
        this.userid = null
      }
    },
    login({ email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          this.setUser(userCredential.user)
        })
    },
    register({ username, email, password }) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const usersRef = firebase.firestore().collection('users')
          return usersRef.add({ userid: userCredential.user.uid, username }).then(() => {
            // TODO dont allow duplicate username
            return this.login({ email, password })
          })
        })
    },
    logout() {
      return firebase.auth().signOut().then(() => {
        this.setUser()
      })
    },
  },
})
