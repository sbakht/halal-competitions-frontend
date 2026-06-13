import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { dateRangeLastWeek, dateRange } from '../utils.js'
import { competitionsJSON, competitionKeys } from '../data'
import { db } from '@/utils/firebase'
import { useTabStore } from './tab'

function getCountBy(user, competitionKey) {
  return { username: user.username, count: user.loggers[competitionKey] }
}

function sort(scores) {
  scores.sort((s1, s2) => (s1.count >= s2.count ? -1 : 1))
}

function orderedLoggerByScore(competitionKey, users) {
  const scores = users.map(user => getCountBy(user, competitionKey)).filter(user => user.count > 0)
  sort(scores)
  return scores
}

function getKeysFor(compId) {
  return Object.keys(competitionsJSON.find(comp => comp.id === compId).counters)
}

function getTitleFromKey(id) {
  return competitionKeys[id].title
}

function filterToActive(loggers, activeTabId) {
  const result = []
  const activeKeys = getKeysFor(activeTabId)
  Object.keys(loggers).forEach(key => {
    if (activeKeys.indexOf(key) > -1) {
      result.push({ title: getTitleFromKey(key), users: loggers[key] })
    }
  })
  return result
}

export const useResultStore = defineStore('result', () => {
  const results = ref([])
  const loadedResults = ref(false)

  const orderedByScore = computed(() => {
    const keys = Object.keys(competitionKeys)
    const orderedLoggersByScore = {}
    keys.forEach(competitionKey => {
      const data = orderedLoggerByScore(competitionKey, results.value)
      if (data.length) {
        orderedLoggersByScore[competitionKey] = data
      }
    })
    const { start, end } = dateRangeLastWeek()
    return {
      start,
      end,
      data: filterToActive(orderedLoggersByScore, useTabStore().activeTabId),
    }
  })

  const totalCum = computed(() => {
    const keys = Object.keys(competitionKeys)
    const totals = {}
    keys.forEach(competitionKey => {
      totals[competitionKey] = orderedLoggerByScore(competitionKey, results.value)
        .reduce((accum, user) => accum + (user.count || 0), 0)
    })
    const { start, end } = dateRange()
    return { start, end, data: totals }
  })

  function loadResults() {
    const { start, end } = dateRangeLastWeek()
    const q = query(
      collection(db, 'loggers'),
      where('lastUpdated', '>=', start),
      where('lastUpdated', '<', end),
    )
    getDocs(q).then((snapshot) => {
      console.assert(snapshot.size > 0, { snapshot, start, end })
      const data = []
      snapshot.forEach(doc => data.push(doc.data()))
      results.value = data
      loadedResults.value = true
    })
  }

  function loadChallenges() {
    const { start, end } = dateRange()
    const q = query(
      collection(db, 'loggers'),
      where('lastUpdated', '>=', start),
      where('lastUpdated', '<', end),
    )
    getDocs(q).then((snapshot) => {
      console.assert(snapshot.size > 0, { snapshot, start, end })
      const data = []
      snapshot.forEach(doc => data.push(doc.data()))
      results.value = data
      loadedResults.value = true
    })
  }

  return {
    results,
    loadedResults,
    orderedByScore,
    totalCum,
    loadResults,
    loadChallenges,
  }
})
