import { vi } from 'vitest'
import type { Timestamp } from 'firebase/firestore'
import type { CounterId } from '@/data'
import type { LoggerDoc } from '@/types/firestore'

const { getDocsMock } = vi.hoisted(() => ({
  getDocsMock: vi.fn(),
}))

vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/firestore')>()
  return {
    ...actual,
    collection: vi.fn(() => 'loggers'),
    query: vi.fn((...args: unknown[]) => args),
    where: vi.fn((...args: unknown[]) => ({ where: args })),
    getDocs: getDocsMock,
  }
})

vi.mock('@/utils/firebase', () => ({
  db: { name: 'test-db' },
}))

function makeLoggerDoc(
  username: string,
  loggers: Partial<Record<CounterId, number>>,
): LoggerDoc {
  return {
    username,
    userid: username,
    loggers: loggers as LoggerDoc['loggers'],
    created: {} as Timestamp,
    lastUpdated: {} as Timestamp,
  }
}

describe('result store Firestore loading', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-12T12:00:00'))
    useTabStore().setActiveTab('dhikr')

    const store = useResultStore()
    store.results = []
    store.loadedResults = false

    getDocsMock.mockReset()
    getDocsMock.mockResolvedValue({
      size: 2,
      forEach: (cb: (doc: { data: () => LoggerDoc }) => void) => {
        cb({ data: () => makeLoggerDoc('alice', { dhikr_1: 10 }) })
        cb({ data: () => makeLoggerDoc('bob', { dhikr_1: 25 }) })
      },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('loads last week results from Firestore', async () => {
    const store = useResultStore()

    store.loadResults()
    await vi.waitFor(() => expect(store.loadedResults).toBe(true))

    expect(getDocsMock).toHaveBeenCalledOnce()
    expect(store.results).toHaveLength(2)
    expect(store.orderedByScore.data[0]?.users[0]).toEqual({
      username: 'bob',
      count: 25,
    })
  })

  it('loads current-week challenge totals from Firestore', async () => {
    const store = useResultStore()

    store.loadChallenges()
    await vi.waitFor(() => expect(store.loadedResults).toBe(true))

    expect(getDocsMock).toHaveBeenCalledOnce()
    expect(store.totalCum.data.dhikr_1).toBe(35)
  })
})
