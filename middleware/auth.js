import firebase from 'firebase/app'
import 'firebase/auth'
import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) {
    return
  }

  const userStore = useUserStore()

  if (userStore.pendingAuth || firebase.auth().currentUser) {
    return
  }

  return navigateTo('/login')
})
