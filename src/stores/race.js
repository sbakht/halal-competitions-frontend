import { defineStore } from 'pinia'
import { competitionKeys } from '../data'
import LoggerService from '../service/Logger'

const loggerService = new LoggerService()

function getUsersLoggers(snapshot) {
  const loggers = []
  if (snapshot.size > 0) {
    snapshot.forEach(doc => {
      loggers.push(doc.data().loggers)
    })
  }
  return loggers
}

function getAllScores(racers) {
  const loggerKeys = Object.keys(competitionKeys)
  const result = {}
  loggerKeys.forEach(key => {
    result[key] = racers.map(racer => racer[key] || 0)
  })
  return result
}

export const useRaceStore = defineStore('race', {
  state: () => ({
    racers: [],
  }),
  getters: {
    scores(state) {
      return getAllScores(state.racers)
    },
  },
  actions: {
    loadRacers() {
      return loggerService.fetchAll().then((snapshot) => {
        this.racers = getUsersLoggers(snapshot)
      })
    },
  },
})
