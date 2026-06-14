import { storeToRefs } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { User } from 'firebase/auth'
import { auth } from '@/utils/firebase'

function hasMiddleware(route: RouteLocationNormalizedLoaded, name: string) {
  const middleware = route.meta.middleware
  if (!middleware) return false
  if (middleware === name) return true
  if (Array.isArray(middleware)) return (middleware as string[]).includes(name)
  return false
}

export function routeRequiresAuth(route: RouteLocationNormalizedLoaded) {
  return hasMiddleware(route, 'auth')
}

export function routeRequiresAnon(route: RouteLocationNormalizedLoaded) {
  return hasMiddleware(route, 'anon')
}

export function useAuth() {
  const userStore = useUserStore()
  const { pendingAuth, isLoggedIn, user, userid } = storeToRefs(userStore)

  function allowProtectedRoute() {
    return pendingAuth.value || !!auth?.currentUser
  }

  function shouldRedirectFromAnon() {
    if (pendingAuth.value || auth?.currentUser) {
      return false
    }
    return isLoggedIn.value
  }

  function handleAuthenticatedNavigation(route: RouteLocationNormalizedLoaded) {
    const loggerStore = useLoggerStore()

    if (route.path === '/dashboard') {
      loggerStore.loadDashboard()
    } else if (route.path === '/stats') {
      loggerStore.loadStats()
    } else if (route.path === '/') {
      navigateTo('/dashboard')
    }
  }

  function syncAuthState(firebaseUser: User | null, route: RouteLocationNormalizedLoaded) {
    if (firebaseUser) {
      userStore.setUser(firebaseUser)

      if (routeRequiresAnon(route)) {
        navigateTo('/dashboard')
      } else {
        handleAuthenticatedNavigation(route)
      }
    } else {
      userStore.setUser()

      if (routeRequiresAuth(route)) {
        navigateTo('/login')
      }
    }

    userStore.completeAuth()
  }

  return {
    pendingAuth,
    isLoggedIn,
    user,
    userid,
    login: userStore.login,
    register: userStore.register,
    logout: userStore.logout,
    allowProtectedRoute,
    shouldRedirectFromAnon,
    syncAuthState,
  }
}
