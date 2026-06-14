import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'

export default defineNuxtPlugin({
  name: 'auth',
  dependsOn: ['firebase'],
  setup() {
    const router = useRouter()

    if (!auth) {
      return
    }

    onAuthStateChanged(auth, (user) => {
      const { syncAuthState } = useAuth()
      syncAuthState(user, router.currentRoute.value)
    })
  },
})
