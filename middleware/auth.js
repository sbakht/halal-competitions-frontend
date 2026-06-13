import { auth } from '@/utils/firebase'
import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) {
    return
  }

  const userStore = useUserStore()

  if (userStore.pendingAuth || auth.currentUser) {
    return
  }

  return navigateTo('/login')
})
