import { app } from '@/utils/firebase.js'

export default defineNuxtPlugin({
  name: 'firebase',
  setup() {
    if (!app) return

    import('firebase/analytics').then(({ getAnalytics, isSupported }) => {
      isSupported().then((ok) => {
        if (ok) getAnalytics(app)
      })
    })
  },
})
