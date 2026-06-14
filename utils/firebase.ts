import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

export interface FirebaseInitResult {
  app: FirebaseApp | null
  auth: Auth | null
  db: Firestore | null
}

export function initFirebase(firebaseConfig: {
  apiKey?: string
  authDomain?: string
  databaseURL?: string
  projectId?: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
  measurementId?: string
}): FirebaseInitResult {
  if (!firebaseConfig?.apiKey) {
    console.warn('[firebase] Missing config — set NUXT_PUBLIC_FIREBASE_* in .env')
    return { app: null, auth: null, db: null }
  }

  app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  return { app, auth, db }
}

export { app, auth, db }
