import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Stats from '../views/Stats.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import store from '../store'
import Results from '../views/Results.vue';
import Challenges from '../views/Challenges.vue';
import firebase from "firebase/app";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { authRequired: true }
  },
  {
    path: '/challenges',
    name: 'challenges',
    component: Challenges,
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats,
    meta: { authRequired: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { anonOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { anonOnly: true }
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter(from, to, next) {
      store.dispatch('logout');
      next('/')
    }
  },
  {
    path: '/results',
    name: 'results',
    component: Results,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  store.dispatch('Nav/closeMobileMenu');
  if (to.matched.some(record => record.meta.authRequired)) {
    if (store.state.User.pendingAuth || firebase.auth().currentUser) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router
