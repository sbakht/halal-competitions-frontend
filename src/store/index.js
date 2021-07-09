import { createStore } from 'vuex'
import User from './User'
import View from './View'
import Tab from './Tab'
import Logger from './Logger'
import Result from './Result';
import Race from './Race';
import { competitionsJSON } from '../data'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    User,
    View,
    Tab,
    Logger,
    Result,
    Race,
  },
  getters: {
    competitions() {
      return competitionsJSON;
    }
  }
})
