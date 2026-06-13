import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'

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
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
      })
  }

  function register({ username, email, password }) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return addDoc(collection(db, 'users'), {
          userid: userCredential.user.uid,
          username,
        }).then(() => {
          // TODO dont allow duplicate username
          return login({ email, password })
        })
      })
  }

  function logout() {
    return signOut(auth).then(() => {
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
