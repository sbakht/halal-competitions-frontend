import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
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

export const useLoggerStore = defineStore('logger', () => {
  const loggers = ref([])
  const allLoggers = ref([])
  const loadedDashboard = ref(false)
  const loadedStats = ref(false)
  const incrementCount = ref(LocalStorage.incrementCount.get())
  const carouselMode = ref(LocalStorage.carouselMode.get())
  const language = ref(LocalStorage.language.get())

  const activeLoggers = computed(() => {
    const scores = useRaceStore().scores
    const activeTabId = useTabStore().activeTabId

    const newIds = Object.keys(loggers.value).filter(
      id => competitionKeys[id].competition === activeTabId
    )
    return newIds.map(id => {
      const count = loggers.value[id]
      return {
        id,
        title: competitionKeys[id].title,
        arabic: competitionKeys[id].arabic,
        count,
        target: getNextHighestScore(count, scores[id]),
      }
    })
  })

  const isDashboardLoaded = computed(() => loadedDashboard.value)

  function increment(logger) {
    // TODO: reset listener to auto reset on new week
    loggers.value[logger.id] = loggers.value[logger.id] + incrementCount.value
  }

  function setIncrementCount(val) {
    incrementCount.value = val
    LocalStorage.incrementCount.set(val)
  }

  function setLanguage(val) {
    language.value = val
    LocalStorage.language.set(val)
  }

  function setCarouselMode(val) {
    carouselMode.value = val
    LocalStorage.carouselMode.set(val)
  }

  function loadDashboard() {
    useNavStore().closeMobileMenu()

    const userid = useUserStore().userid

    if (userid) {
      loggerService.fetchById(userid).then(({ docs }) => {
        const nextLoggers = getLoggers(docs)
        addUntrackedLoggers(nextLoggers)
        loggers.value = nextLoggers
        loadedDashboard.value = true
        useRaceStore().loadRacers()
      })
    }
  }

  function loadStats() {
    useNavStore().closeMobileMenu()

    const userid = useUserStore().userid

    if (userid) {
      loggerService.fetchAllById(userid).then(({ docs }) => {
        allLoggers.value = docs.map(doc => doc.data().loggers)
        loadedStats.value = true
      })
    }
  }

  function save() {
    const userStore = useUserStore()
    loggerService.save({
      state: { loggers: loggers.value },
      rootState: { User: { userid: userStore.userid } },
    })
  }

  return {
    loggers,
    allLoggers,
    loadedDashboard,
    loadedStats,
    incrementCount,
    carouselMode,
    language,
    activeLoggers,
    isDashboardLoaded,
    increment,
    setIncrementCount,
    setLanguage,
    setCarouselMode,
    loadDashboard,
    loadStats,
    save,
  }
})
