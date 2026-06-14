import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { dateRangeLastWeek, dateRange } from '@/utils'
import { competitionKeys, type CounterId } from '@/data'
import { db } from '@/utils/firebase'
import { useTabStore } from '@/stores/tab'
import {
  filterToActiveTab,
  orderedLoggerByScore,
  sumScores,
  type ScoreEntry,
} from '@/utils/scoring'
import type { LoggerDoc } from '@/types/firestore'

export const useResultStore = defineStore('result', () => {
  const results = ref<LoggerDoc[]>([])
  const loadedResults = ref(false)

  const orderedByScore = computed(() => {
    const keys = Object.keys(competitionKeys) as CounterId[]
    const orderedLoggersByScore: Partial<Record<CounterId, ScoreEntry[]>> = {}
    keys.forEach((competitionKey) => {
      const data = orderedLoggerByScore(competitionKey, results.value)
      if (data.length) {
        orderedLoggersByScore[competitionKey] = data
      }
    })
    const { start, end } = dateRangeLastWeek()
    return {
      start,
      end,
      data: filterToActiveTab(orderedLoggersByScore, useTabStore().activeTabId),
    }
  })

  const totalCum = computed(() => {
    const keys = Object.keys(competitionKeys) as CounterId[]
    const totals: Partial<Record<CounterId, number>> = {}
    keys.forEach((competitionKey) => {
      totals[competitionKey] = sumScores(
        orderedLoggerByScore(competitionKey, results.value),
      )
    })
    const { start, end } = dateRange()
    return { start, end, data: totals }
  })

  function loadResults() {
    if (!db) {
      return
    }

    const { start, end } = dateRangeLastWeek()
    const q = query(
      collection(db, 'loggers'),
      where('lastUpdated', '>=', start),
      where('lastUpdated', '<', end),
    )
    getDocs(q).then((snapshot) => {
      console.assert(snapshot.size > 0, { snapshot, start, end })
      const data: LoggerDoc[] = []
      snapshot.forEach(docSnap => data.push(docSnap.data() as LoggerDoc))
      results.value = data
      loadedResults.value = true
    })
  }

  function loadChallenges() {
    if (!db) {
      return
    }

    const { start, end } = dateRange()
    const q = query(
      collection(db, 'loggers'),
      where('lastUpdated', '>=', start),
      where('lastUpdated', '<', end),
    )
    getDocs(q).then((snapshot) => {
      console.assert(snapshot.size > 0, { snapshot, start, end })
      const data: LoggerDoc[] = []
      snapshot.forEach(docSnap => data.push(docSnap.data() as LoggerDoc))
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
