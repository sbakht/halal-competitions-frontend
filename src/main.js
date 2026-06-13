import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/index.css'
import { useUserStore } from './stores/user'
import { useLoggerStore } from './stores/logger'

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyAfIeG5JZSQ00sYE_Gg8JhxTr7XNCRj0rE",
  authDomain: "halal-competitions.firebaseapp.com",
  databaseURL: "https://halal-competitions.firebaseio.com",
  projectId: "halal-competitions",
  storageBucket: "halal-competitions.appspot.com",
  messagingSenderId: "859253549365",
  appId: "1:859253549365:web:d71b27dba4162c4b22c47c",
  measurementId: "G-1HC6BLY19C"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

firebase.auth().onAuthStateChanged(function (user) {
  const userStore = useUserStore()
  const loggerStore = useLoggerStore()
  let authRequired;
  if (user) {
    let match;
    router.currentRoute.value.matched.flatMap(record => {
      match = record.path
      authRequired = record.meta.authRequired
    })

    userStore.setUser(user);
    if (match === '/dashboard') {
      loggerStore.loadDashboard()
    } else if (match === "/stats") {
      loggerStore.loadStats()
    } else if (match === "/") {
      router.push('/dashboard')
    }
  } else {
    userStore.setUser();
    if (authRequired) {
      router.push('/login');
    }
  }
  userStore.completeAuth()
});
