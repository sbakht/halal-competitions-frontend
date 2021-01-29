import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Home from './views/Home.vue';
import store from './store'
import Results from './views/Results.vue';

Vue.use(Router)

export default new Router({
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
      beforeEnter(from, to, next) {
        store.dispatch('closeMobileMenu')
        if(store.getters.isLoggedIn) {
          next();
        }else{
          next('/login');
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter(from, to, next) {
        store.dispatch('closeMobileMenu')
        if(store.getters.isLoggedIn) {
          next('/dashboard');
        }else{
          next();
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter(from, to, next) {
        store.dispatch('closeMobileMenu')
        if(store.getters.isLoggedIn) {
          next('/dashboard');
        }else{
          next();
        }
      }
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
      beforeEnter(from, to, next) {
        store.dispatch('closeMobileMenu')
        next();
      }
    }
  ]
})
