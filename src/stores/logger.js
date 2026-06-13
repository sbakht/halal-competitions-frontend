import { defineStore } from 'pinia'
import { competitionsJSON, competitionKeys } from '../data'
import LoggerService from '../service/Logger.js'
import LocalStorage from '../utils/LocalStorage'
import { useUserStore } from './user'
import { useRaceStore } from './race'
import { useTabStore } from './tab'
import { useNavStore } from './nav'

const loggerService = new LoggerService()

function addUntrackedLoggers(loggers) {
  competitionsJSON.forEach(comp => Object.keys(comp.counters).forEach(loggerId => {
    if (!loggers[loggerId]) {
      loggers[loggerId] = 0
    }
  }))
}

function getNextHighestScore(count, scores) {
  return scores.sort().find(score => score > count)
}

function getLoggers(docs) {
  return (docs.length && docs[0].data().loggers) || {}
}

export const useLoggerStore = defineStore('logger', {
  state: () => ({
    loggers: [],
    allLoggers: [],
    loadedDashboard: false,
    loadedStats: false,
    incrementCount: LocalStorage.incrementCount.get(),
    carouselMode: LocalStorage.carouselMode.get(),
    language: LocalStorage.language.get(),
  }),
  getters: {
    activeLoggers(state) {
      const scores = useRaceStore().scores
      const activeTabId = useTabStore().activeTabId

      const newIds = Object.keys(state.loggers).filter(
        id => competitionKeys[id].competition === activeTabId
      )
      return newIds.map(id => {
        const count = state.loggers[id]
        return {
          id,
          title: competitionKeys[id].title,
          arabic: competitionKeys[id].arabic,
          count,
          target: getNextHighestScore(count, scores[id]),
        }
      })
    },
    isDashboardLoaded: (state) => state.loadedDashboard,
  },
  actions: {
    increment(logger) {
      // TODO: reset listener to auto reset on new week
      this.loggers[logger.id] = this.loggers[logger.id] + this.incrementCount
    },
    setIncrementCount(val) {
      this.incrementCount = val
      LocalStorage.incrementCount.set(val)
    },
    setLanguage(val) {
      this.language = val
      LocalStorage.language.set(val)
    },
    setCarouselMode(val) {
      this.carouselMode = val
      LocalStorage.carouselMode.set(val)
    },
    loadDashboard() {
      useNavStore().closeMobileMenu()

      const userid = useUserStore().userid

      if (userid) {
        loggerService.fetchById(userid).then(({ docs }) => {
          const loggers = getLoggers(docs)
          addUntrackedLoggers(loggers)
          this.loggers = loggers
          this.loadedDashboard = true
          useRaceStore().loadRacers()
        })
      }
    },
    loadStats() {
      useNavStore().closeMobileMenu()

      const userid = useUserStore().userid

      if (userid) {
        loggerService.fetchAllById(userid).then(({ docs }) => {
          this.allLoggers = docs.map(doc => doc.data().loggers)
          this.loadedStats = true
        })
      }
    },
    save() {
      const userStore = useUserStore()
      loggerService.save({
        state: this.$state,
        rootState: { User: { userid: userStore.userid } },
      })
    },
  },
})
