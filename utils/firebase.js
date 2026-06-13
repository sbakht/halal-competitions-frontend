import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAfIeG5JZSQ00sYE_Gg8JhxTr7XNCRj0rE',
  authDomain: 'halal-competitions.firebaseapp.com',
  databaseURL: 'https://halal-competitions.firebaseio.com',
  projectId: 'halal-competitions',
  storageBucket: 'halal-competitions.appspot.com',
  messagingSenderId: '859253549365',
  appId: '1:859253549365:web:d71b27dba4162c4b22c47c',
  measurementId: 'G-1HC6BLY19C',
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export { app }
export const auth = getAuth(app)
export const db = getFirestore(app)
