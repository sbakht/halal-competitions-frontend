/// <reference types="vitest/globals" />
import { vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
}))

vi.mock('@/utils/firebase', () => ({
  db: null,
}))

import { useResultStore } from '@/stores/result'

describe('result store without Firestore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('does not load results when Firestore is unavailable', () => {
    const store = useResultStore()

    store.loadResults()
    store.loadChallenges()

    expect(store.loadedResults).toBe(false)
    expect(store.results).toEqual([])
  })
})
