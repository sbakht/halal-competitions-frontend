import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import LoggerService from '@/service/Logger'
import { getAllScores } from '@/utils/scoring'
import type { LoggerMap } from '@/types/firestore'

const loggerService = new LoggerService()

function getUsersLoggers(snapshot: Awaited<ReturnType<LoggerService['fetchAll']>>) {
  const loggers: LoggerMap[] = []
  if (snapshot.size > 0) {
    snapshot.forEach((docSnap) => {
      loggers.push(docSnap.data().loggers as LoggerMap)
    })
  }
  return loggers
}

export const useRaceStore = defineStore('race', () => {
  const racers = ref<LoggerMap[]>([])

  const scores = computed(() => getAllScores(racers.value))

  function loadRacers() {
    return loggerService.fetchAll().then((snapshot) => {
      racers.value = getUsersLoggers(snapshot)
    })
  }

  return { racers, scores, loadRacers }
})
