import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { useUserStore } from '@/stores/user'
import { useLoggerStore } from '@/stores/logger'

function routeRequiresAuth(route) {
  const middleware = route.meta.middleware
  if (!middleware) return false
  if (middleware === 'auth') return true
  if (Array.isArray(middleware)) return middleware.includes('auth')
  return false
}

export default defineNuxtPlugin({
  name: 'auth',
  dependsOn: ['firebase'],
  setup() {
    const router = useRouter()

    onAuthStateChanged(auth, (user) => {
      const userStore = useUserStore()
      const loggerStore = useLoggerStore()
      const route = router.currentRoute.value
      const authRequired = routeRequiresAuth(route)

      if (user) {
        userStore.setUser(user)

        if (route.path === '/dashboard') {
          loggerStore.loadDashboard()
        } else if (route.path === '/stats') {
          loggerStore.loadStats()
        } else if (route.path === '/') {
          navigateTo('/dashboard')
        }
      } else {
        userStore.setUser()
        if (authRequired) {
          navigateTo('/login')
        }
      }

      userStore.completeAuth()
    })
  },
})
