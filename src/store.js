import Vue from 'vue'
import Vuex from 'vuex'
import User from './state/User'
import View from './state/View'
import Tab from './state/Tab'
import Logger from './state/Logger'
import Result from './state/Result';
import Race from './state/Race';
import { competitionsJSON } from './data'

// TODO
// tailwind minimizer
// make pwa work
// ------- release
// do we need to add untracked loggers?
// firebase security
// column count options
// decrement option
// alert when beaten
// settings section

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    User,
    View,
    Tab,
    Logger,
    Result,
    Race,
  },
  state: {
    competitions: competitionsJSON
  },
})
