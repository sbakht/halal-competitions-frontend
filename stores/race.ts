import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { competitionKeys, type CounterId } from '@/data'
import LoggerService from '@/service/Logger'
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

function getAllScores(racers: LoggerMap[]) {
  const loggerKeys = Object.keys(competitionKeys) as CounterId[]
  const result: Record<CounterId, number[]> = {} as Record<CounterId, number[]>
  loggerKeys.forEach((key) => {
    result[key] = racers.map(racer => racer[key] || 0)
  })
  return result
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
