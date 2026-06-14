export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) {
    return
  }

  const { shouldRedirectFromAnon } = useAuth()

  if (shouldRedirectFromAnon()) {
    return navigateTo('/dashboard')
  }
})
