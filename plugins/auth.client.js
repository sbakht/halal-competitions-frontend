import { onAuthStateChanged } from 'firebase/auth'
import { useAuth } from '@/composables/useAuth'
import { auth } from '@/utils/firebase'

export default defineNuxtPlugin({
  name: 'auth',
  dependsOn: ['firebase'],
  setup() {
    const router = useRouter()

    onAuthStateChanged(auth, (user) => {
      const { syncAuthState } = useAuth()
      syncAuthState(user, router.currentRoute.value)
    })
  },
})
