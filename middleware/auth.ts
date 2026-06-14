export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) {
    return
  }

  const { allowProtectedRoute } = useAuth()

  if (allowProtectedRoute()) {
    return
  }

  return navigateTo('/login')
})
