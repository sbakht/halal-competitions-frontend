/// <reference types="vitest/globals" />
import { competitionKeys, competitionsJSON } from '@/data'
import type { CompetitionId } from '@/types/competition'

const competitionIds: CompetitionId[] = ['dhikr', 'mindful', 'charity', 'fitness']

describe('competitionsJSON', () => {
  it('defines all four competition groups', () => {
    expect(competitionsJSON.map(c => c.id)).toEqual(competitionIds)
  })

  it('gives each competition at least one counter', () => {
    for (const competition of competitionsJSON) {
      expect(Object.keys(competition.counters).length).toBeGreaterThan(0)
    }
  })
})

describe('competitionKeys', () => {
  it('maps every counter id to its parent competition and title', () => {
    for (const competition of competitionsJSON) {
      for (const [counterId, counter] of Object.entries(competition.counters)) {
        const meta = competitionKeys[counterId as keyof typeof competitionKeys]

        expect(meta).toBeDefined()
        expect(meta.competition).toBe(competition.id)
        expect(meta.title).toBe(counter.title)
      }
    }
  })

  it('does not define orphan keys outside competitionsJSON', () => {
    const counterIds = new Set(
      competitionsJSON.flatMap(c => Object.keys(c.counters)),
    )

    for (const key of Object.keys(competitionKeys)) {
      expect(counterIds.has(key)).toBe(true)
    }
  })
})
