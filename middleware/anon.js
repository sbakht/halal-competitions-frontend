import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore()

  if (userStore.isLoggedIn) {
    return navigateTo('/dashboard')
  }
})
