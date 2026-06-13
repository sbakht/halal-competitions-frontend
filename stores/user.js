import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import firebase from 'firebase/app'

export const useUserStore = defineStore('user', () => {
  const pendingAuth = ref(true)
  const user = ref(null)
  const userid = ref(null)

  const isLoggedIn = computed(() => !!userid.value)

  function completeAuth() {
    pendingAuth.value = false
  }

  function setUser(nextUser = null) {
    if (nextUser) {
      user.value = nextUser
      userid.value = nextUser.uid
    } else {
      user.value = null
      userid.value = null
    }
  }

  function login({ email, password }) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
  }

  function register({ username, email, password }) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const usersRef = firebase.firestore().collection('users')
        return usersRef.add({ userid: userCredential.user.uid, username }).then(() => {
          // TODO dont allow duplicate username
          return login({ email, password })
        })
      })
  }

  function logout() {
    return firebase.auth().signOut().then(() => {
      setUser()
    })
  }

  return {
    pendingAuth,
    user,
    userid,
    isLoggedIn,
    completeAuth,
    setUser,
    login,
    register,
    logout,
  }
})
