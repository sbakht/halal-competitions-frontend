import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

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

export default defineNuxtPlugin({
  name: 'firebase',
  setup() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
      firebase.analytics()
      firebase.firestore()
    }
  },
})
