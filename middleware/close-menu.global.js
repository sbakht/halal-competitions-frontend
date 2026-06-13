import { useNavStore } from '@/stores/nav'

export default defineNuxtRouteMiddleware(() => {
  useNavStore().closeMobileMenu()
})
