import Vue from 'vue'
import App from './App.vue'
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

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


var db = firebase.firestore();

db.useEmulator("localhost", 8083);
firebase.auth().useEmulator('http://localhost:8081/');



db.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch('setUser', user);
    router.push({name: 'dashboard'});
  } else {
    store.dispatch('setUser');
  }
});