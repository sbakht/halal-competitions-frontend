import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './assets/index.css'


// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


firebase.firestore();

// db.useEmulator("localhost", 8083);
// firebase.auth().useEmulator('http://localhost:8081/');

createApp(App).use(store).use(router).mount('#app')

firebase.auth().onAuthStateChanged(function (user) {
  let authRequired;
  if (user) {
    let match;
    router.currentRoute.value.matched.flatMap(record => {
      match = record.path
      authRequired = record.meta.authRequired
    })

    store.dispatch('setUser', user);
    if (match === '/dashboard') {
      store.dispatch('Logger/loadDashboard')
    } else if (match === "/stats") {
      store.dispatch('Logger/loadStats')
    } else if (match === "/") {
      router.push('/dashboard')
    }
  } else {
    store.dispatch('setUser');
    if (authRequired) {
      router.push('/login');
    }
  }
  store.dispatch('completeAuth')
});