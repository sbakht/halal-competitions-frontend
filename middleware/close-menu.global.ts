export default defineNuxtRouteMiddleware(() => {
  useNavStore().closeMobileMenu()
})
