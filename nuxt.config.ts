export default defineNuxtConfig({
  ssr: false,
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/index.css'],
  app: {
    head: {
      title: 'halal-competitions',
      link: [{ rel: 'icon', href: '/favicon.png' }],
    },
  },
  nitro: {
    preset: 'static',
  },
  compatibilityDate: '2024-11-01',
})
