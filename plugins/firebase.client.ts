import { initFirebase } from '@/utils/firebase'

export default defineNuxtPlugin({
  name: 'firebase',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig()
    const { app } = initFirebase(config.public.firebase)
    if (!app) return

    import('firebase/analytics').then(({ getAnalytics, isSupported }) => {
      isSupported().then((ok) => {
        if (ok) getAnalytics(app)
      })
    })
  },
})
