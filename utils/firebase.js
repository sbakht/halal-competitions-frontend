import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

let app = null
let auth = null
let db = null

export function initFirebase(firebaseConfig) {
  if (!firebaseConfig?.apiKey) {
    console.warn('[firebase] Missing config — set NUXT_PUBLIC_FIREBASE_* in .env')
    return { app: null, auth: null, db: null }
  }

  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  return { app, auth, db }
}

export { app, auth, db }
