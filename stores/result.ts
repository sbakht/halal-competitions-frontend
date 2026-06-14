import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { dateRangeLastWeek, dateRange } from '@/utils'
import { competitionsJSON, competitionKeys, type CounterId } from '@/data'
import { db } from '@/utils/firebase'
import { useTabStore } from '@/stores/tab'
import type { CompetitionId } from '@/types/competition'
import type { LoggerDoc } from '@/types/firestore'

interface ScoreEntry {
  username: string
  count: number
}

interface LeaderboardRow {
  title: string
  users: ScoreEntry[]
}

function getCountBy(user: LoggerDoc, competitionKey: CounterId) {
  return { username: user.username, count: user.loggers[competitionKey] ?? 0 }
}

function sort(scores: ScoreEntry[]) {
  scores.sort((s1, s2) => (s1.count >= s2.count ? -1 : 1))
}

function orderedLoggerByScore(competitionKey: CounterId, users: LoggerDoc[]) {
  const scores = users
    .map(user => getCountBy(user, competitionKey))
    .filter(user => user.count > 0)
  sort(scores)
  return scores
}

function getKeysFor(compId: CompetitionId) {
  const comp = competitionsJSON.find(entry => entry.id === compId)
  return Object.keys(comp?.counters ?? {})
}

function getTitleFromKey(id: CounterId) {
  return competitionKeys[id].title
}

function filterToActive(
  loggers: Partial<Record<CounterId, ScoreEntry[]>>,
  activeTabId: CompetitionId,
) {
  const result: LeaderboardRow[] = []
  const activeKeys = getKeysFor(activeTabId)
  Object.keys(loggers).forEach((key) => {
    const counterId = key as CounterId
    if (activeKeys.indexOf(counterId) > -1 && loggers[counterId]) {
      result.push({ title: getTitleFromKey(counterId), users: loggers[counterId]! })
    }
  })
  return result
}

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
      data: filterToActive(orderedLoggersByScore, useTabStore().activeTabId),
    }
  })

  const totalCum = computed(() => {
    const keys = Object.keys(competitionKeys) as CounterId[]
    const totals: Partial<Record<CounterId, number>> = {}
    keys.forEach((competitionKey) => {
      totals[competitionKey] = orderedLoggerByScore(competitionKey, results.value)
        .reduce((accum, user) => accum + (user.count || 0), 0)
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
