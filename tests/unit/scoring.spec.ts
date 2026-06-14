/// <reference types="vitest/globals" />
import type { Timestamp } from 'firebase/firestore'
import {
  filterToActiveTab,
  getAllScores,
  getNextHighestScore,
  orderedLoggerByScore,
  sumScores,
} from '@/utils/scoring'
import type { CounterId } from '@/data'
import type { LoggerDoc, LoggerMap } from '@/types/firestore'

function makeLoggerDoc(
  username: string,
  loggers: Partial<Record<CounterId, number>>,
): LoggerDoc {
  return {
    username,
    userid: username,
    loggers: loggers as LoggerMap,
    created: {} as Timestamp,
    lastUpdated: {} as Timestamp,
  }
}

describe('orderedLoggerByScore', () => {
  const users = [
    makeLoggerDoc('alice', { dhikr_1: 10 }),
    makeLoggerDoc('bob', { dhikr_1: 25 }),
    makeLoggerDoc('carol', { dhikr_1: 0 }),
    makeLoggerDoc('dave', { dhikr_1: 25 }),
  ]

  it('sorts scores descending', () => {
    const scores = orderedLoggerByScore('dhikr_1', users)

    expect(scores.map(s => s.count)).toEqual([25, 25, 10])
    expect(scores.map(s => s.username).slice(0, 2).sort()).toEqual(['bob', 'dave'])
    expect(scores[2].username).toBe('alice')
  })

  it('excludes users with zero counts', () => {
    const scores = orderedLoggerByScore('dhikr_1', users)

    expect(scores.find(s => s.username === 'carol')).toBeUndefined()
  })

  it('returns an empty array when no one has logged for the counter', () => {
    expect(orderedLoggerByScore('dhikr_1', [])).toEqual([])
  })
})

describe('filterToActiveTab', () => {
  const dhikrScores = {
    dhikr_1: [{ username: 'alice', count: 10 }],
    mindful_1: [{ username: 'bob', count: 5 }],
  }

  it('keeps only counters belonging to the active competition', () => {
    const rows = filterToActiveTab(dhikrScores, 'dhikr')

    expect(rows).toHaveLength(1)
    expect(rows[0].title).toBe('SubhanAllah')
    expect(rows[0].users).toEqual([{ username: 'alice', count: 10 }])
  })

  it('returns mindful counters when the mindful tab is active', () => {
    const rows = filterToActiveTab(dhikrScores, 'mindful')

    expect(rows).toHaveLength(1)
    expect(rows[0].title).toBe('Recitation (min)')
    expect(rows[0].users[0].username).toBe('bob')
  })
})

describe('sumScores', () => {
  it('totals non-zero score entries', () => {
    const entries = [
      { username: 'alice', count: 10 },
      { username: 'bob', count: 25 },
    ]

    expect(sumScores(entries)).toBe(35)
  })
})

describe('getAllScores', () => {
  it('collects each racer score per counter id', () => {
    const racers: LoggerMap[] = [
      { dhikr_1: 5, dhikr_2: 0 } as LoggerMap,
      { dhikr_1: 12, dhikr_2: 3 } as LoggerMap,
    ]

    const scores = getAllScores(racers)

    expect(scores.dhikr_1).toEqual([5, 12])
    expect(scores.dhikr_2).toEqual([0, 3])
  })

  it('returns empty arrays when there are no racers', () => {
    const scores = getAllScores([])

    expect(scores.dhikr_1).toEqual([])
  })
})

describe('getNextHighestScore', () => {
  it('returns the lowest score strictly above the current count', () => {
    expect(getNextHighestScore(5, [3, 10, 7, 15])).toBe(7)
  })

  it('returns undefined when no higher score exists', () => {
    expect(getNextHighestScore(20, [5, 10, 15])).toBeUndefined()
  })

  it('returns undefined when scores are missing', () => {
    expect(getNextHighestScore(5, undefined)).toBeUndefined()
  })
})
