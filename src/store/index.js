import { createStore } from 'vuex'
import User from './User'
import Nav from './Nav'
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
    Nav,
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
