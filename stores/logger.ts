import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import { competitionsJSON, competitionKeys, type CounterId } from '@/data'
import LoggerService from '@/service/Logger'
import LocalStorage from '@/utils/LocalStorage'
import { useUserStore } from '@/stores/user'
import { useRaceStore } from '@/stores/race'
import { useTabStore } from '@/stores/tab'
import { useNavStore } from '@/stores/nav'
import type { ActiveLogger } from '@/types/competition'
import type { LoggerMap } from '@/types/firestore'

const loggerService = new LoggerService()

function addUntrackedLoggers(loggers: LoggerMap) {
  competitionsJSON.forEach((comp) => {
    Object.keys(comp.counters).forEach((loggerId) => {
      const id = loggerId as CounterId
      if (!loggers[id]) {
        loggers[id] = 0
      }
    })
  })
}

function getNextHighestScore(count: number, scores: number[] | undefined) {
  if (!scores) {
    return undefined
  }
  return [...scores].sort((a, b) => a - b).find(score => score > count)
}

function getLoggers(docs: QueryDocumentSnapshot[]) {
  return ((docs.length && docs[0]?.data().loggers) || {}) as LoggerMap
}

export const useLoggerStore = defineStore('logger', () => {
  const loggers = ref<LoggerMap>({} as LoggerMap)
  const allLoggers = ref<LoggerMap[]>([])
  const loadedDashboard = ref(false)
  const loadedStats = ref(false)
  const incrementCount = ref(LocalStorage.incrementCount.get())
  const carouselMode = ref(LocalStorage.carouselMode.get())
  const language = ref(LocalStorage.language.get())

  const activeLoggers = computed((): ActiveLogger[] => {
    const scores = useRaceStore().scores
    const activeTabId = useTabStore().activeTabId

    const newIds = (Object.keys(loggers.value) as CounterId[]).filter(
      id => competitionKeys[id].competition === activeTabId,
    )
    return newIds.map((id) => {
      const count = loggers.value[id] ?? 0
      const meta = competitionKeys[id]
      return {
        id,
        title: meta.title,
        arabic: 'arabic' in meta ? meta.arabic : undefined,
        count,
        target: getNextHighestScore(count, scores[id]),
      }
    })
  })

  const isDashboardLoaded = computed(() => loadedDashboard.value)

  function increment(logger: ActiveLogger) {
    // TODO: reset listener to auto reset on new week
    const current = loggers.value[logger.id as CounterId] ?? 0
    loggers.value[logger.id as CounterId] = current + incrementCount.value
  }

  function setIncrementCount(val: number) {
    incrementCount.value = val
    LocalStorage.incrementCount.set(val)
  }

  function setLanguage(val: string[]) {
    language.value = val
    LocalStorage.language.set(val)
  }

  function setCarouselMode(val: boolean) {
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
        allLoggers.value = docs.map(docSnap => docSnap.data().loggers as LoggerMap)
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
