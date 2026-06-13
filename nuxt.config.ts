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
  vite: {
    optimizeDeps: {
      exclude: [
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
        'firebase/analytics',
      ],
    },
  },
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: '',
      },
    },
  },
})
