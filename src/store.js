import Vue from 'vue'
import Vuex from 'vuex'
import User from './state/User'
import View from './state/View'
import Tab from './state/Tab'
import Logger from './state/Logger'
import Result from './state/Result';
import { competitionsJSON } from './data'

// TODO
// column count options
// decrement option
// make pwa work
// alert when beaten
// settings section
// use custom login with username instead of email

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    User,
    View,
    Tab,
    Logger,
    Result,
  },
  state: {
    competitions: competitionsJSON
  },
})
