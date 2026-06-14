import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '@/utils/firebase'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  username: string
}

export const useUserStore = defineStore('user', () => {
  const pendingAuth = ref(true)
  const user = ref<User | null>(null)
  const userid = ref<string | null>(null)

  const isLoggedIn = computed(() => !!userid.value)

  function completeAuth() {
    pendingAuth.value = false
  }

  function setUser(nextUser: User | null = null) {
    if (nextUser) {
      user.value = nextUser
      userid.value = nextUser.uid
    } else {
      user.value = null
      userid.value = null
    }
  }

  function login({ email, password }: LoginPayload) {
    if (!auth) {
      return Promise.reject(new Error('Firebase auth not initialized'))
    }

    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user)
    })
  }

  function register({ username, email, password }: RegisterPayload) {
    if (!auth || !db) {
      return Promise.reject(new Error('Firebase not initialized'))
    }

    const firestore = db

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return addDoc(collection(firestore, 'users'), {
          userid: userCredential.user.uid,
          username,
        }).then(() => {
          // TODO dont allow duplicate username
          return login({ email, password })
        })
      })
  }

  function logout() {
    if (!auth) {
      return Promise.reject(new Error('Firebase auth not initialized'))
    }

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
