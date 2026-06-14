import { storeToRefs } from 'pinia'
import { auth } from '@/utils/firebase'

function hasMiddleware(route, name) {
  const middleware = route.meta.middleware
  if (!middleware) return false
  if (middleware === name) return true
  if (Array.isArray(middleware)) return middleware.includes(name)
  return false
}

export function routeRequiresAuth(route) {
  return hasMiddleware(route, 'auth')
}

export function routeRequiresAnon(route) {
  return hasMiddleware(route, 'anon')
}

export function useAuth() {
  const userStore = useUserStore()
  const { pendingAuth, isLoggedIn, user, userid } = storeToRefs(userStore)

  function allowProtectedRoute() {
    return pendingAuth.value || !!auth.currentUser
  }

  function shouldRedirectFromAnon() {
    if (pendingAuth.value || auth.currentUser) {
      return false
    }
    return isLoggedIn.value
  }

  function handleAuthenticatedNavigation(route) {
    const loggerStore = useLoggerStore()

    if (route.path === '/dashboard') {
      loggerStore.loadDashboard()
    } else if (route.path === '/stats') {
      loggerStore.loadStats()
    } else if (route.path === '/') {
      navigateTo('/dashboard')
    }
  }

  function syncAuthState(firebaseUser, route) {
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
