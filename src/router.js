import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Stats from './views/Stats.vue'
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Home from './views/Home.vue';
import store from './store'
import Results from './views/Results.vue';
import Challenges from './views/Challenges.vue';
import firebase from "firebase/app";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
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
})

router.beforeEach((to, from, next) => {
  store.dispatch('closeMobileMenu');
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

export default router;