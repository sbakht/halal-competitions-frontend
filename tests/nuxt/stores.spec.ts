import { vi } from 'vitest'
import type { Timestamp } from 'firebase/firestore'
import type { CounterId } from '@/data'
import type { LoggerDoc, LoggerMap } from '@/types/firestore'

const {
  fetchByIdMock,
  fetchAllByIdMock,
  saveMock,
  fetchAllMock,
} = vi.hoisted(() => ({
  fetchByIdMock: vi.fn(),
  fetchAllByIdMock: vi.fn(),
  saveMock: vi.fn(),
  fetchAllMock: vi.fn(),
}))

vi.mock('@/service/Logger', () => ({
  default: vi.fn().mockImplementation(() => ({
    fetchById: fetchByIdMock,
    fetchAllById: fetchAllByIdMock,
    fetchAll: fetchAllMock,
    save: saveMock,
  })),
}))

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

function resetLoggerStore() {
  const store = useLoggerStore()
  store.loggers = {} as LoggerMap
  store.allLoggers = []
  store.loadedDashboard = false
  store.loadedStats = false
  store.setIncrementCount(1)
  store.setCarouselMode(false)
  store.setLanguage(['english', 'arabic'])
}

describe('nav store', () => {
  it('toggles the mobile menu open state', () => {
    const store = useNavStore()

    expect(store.isMobileMenuOpen).toBe(false)

    store.openMobileMenu()
    expect(store.isMobileMenuOpen).toBe(true)

    store.closeMobileMenu()
    expect(store.isMobileMenuOpen).toBe(false)
  })
})

describe('tab store', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('defaults to dhikr from LocalStorage', () => {
    expect(useTabStore().activeTabId).toBe('dhikr')
  })

  it('persists the active competition tab', () => {
    const store = useTabStore()

    store.setActiveTab('fitness')

    expect(store.activeTabId).toBe('fitness')
    expect(window.localStorage.getItem('activeTabId')).toBe('fitness')
  })
})

describe('logger store', () => {
  beforeEach(() => {
    window.localStorage.clear()
    resetLoggerStore()
    useNavStore().closeMobileMenu()
    vi.clearAllMocks()
  })

  it('increments a counter by incrementCount', () => {
    const store = useLoggerStore()
    store.loggers = { dhikr_1: 4 } as LoggerMap
    store.setIncrementCount(3)

    store.increment({
      id: 'dhikr_1',
      title: 'SubhanAllah',
      count: 4,
    })

    expect(store.loggers.dhikr_1).toBe(7)
  })

  it('persists UI preferences to LocalStorage', () => {
    const store = useLoggerStore()

    store.setIncrementCount(5)
    store.setCarouselMode(true)
    store.setLanguage(['english'])

    expect(window.localStorage.getItem('increment-count')).toBe('5')
    expect(window.localStorage.getItem('carousel-mode')).toBe('true')
    expect(window.localStorage.getItem('language')).toBe('english')
    expect(store.incrementCount).toBe(5)
    expect(store.carouselMode).toBe(true)
    expect(store.language).toEqual(['english'])
  })

  it('builds activeLoggers for the current tab with leaderboard targets', () => {
    const loggerStore = useLoggerStore()
    const tabStore = useTabStore()
    const raceStore = useRaceStore()

    tabStore.setActiveTab('dhikr')
    loggerStore.loggers = { dhikr_1: 5, mindful_1: 10 } as LoggerMap
    raceStore.racers = [{ dhikr_1: 10, dhikr_2: 8, mindful_1: 20 }] as LoggerMap[]

    const active = loggerStore.activeLoggers
    const dhikrLogger = active.find(entry => entry.id === 'dhikr_1')

    expect(active.map(entry => entry.id)).not.toContain('mindful_1')
    expect(dhikrLogger).toMatchObject({
      id: 'dhikr_1',
      title: 'SubhanAllah',
      count: 5,
      target: 10,
    })
  })

  it('does not fetch dashboard data without a signed-in user', async () => {
    resetLoggerStore()
    vi.clearAllMocks()

    useLoggerStore().loadDashboard()
    await new Promise(resolve => setTimeout(resolve, 10))

    expect(fetchByIdMock).not.toHaveBeenCalled()
    expect(useLoggerStore().loadedDashboard).toBe(false)
  })

  it('loads dashboard data and initializes missing counters', async () => {
    useUserStore().setUser({ uid: 'user-1' } as import('firebase/auth').User)

    fetchByIdMock.mockResolvedValueOnce({
      docs: [{ data: () => ({ loggers: { dhikr_1: 2 } }) }],
    })

    const loggerStore = useLoggerStore()
    const raceSpy = vi.spyOn(useRaceStore(), 'loadRacers').mockResolvedValue(undefined)

    loggerStore.loadDashboard()
    await vi.waitFor(() => expect(loggerStore.loadedDashboard).toBe(true))

    expect(fetchByIdMock).toHaveBeenCalledWith('user-1')
    expect(loggerStore.loggers.dhikr_1).toBe(2)
    expect(loggerStore.loggers.dhikr_2).toBe(0)
    expect(raceSpy).toHaveBeenCalled()

    raceSpy.mockRestore()
  })

  it('loads historical stats for the signed-in user', async () => {
    useUserStore().setUser({ uid: 'user-1' } as import('firebase/auth').User)

    fetchAllByIdMock.mockResolvedValueOnce({
      docs: [
        { data: () => ({ loggers: { dhikr_1: 1 } }) },
        { data: () => ({ loggers: { dhikr_1: 9 } }) },
      ],
    })

    const loggerStore = useLoggerStore()
    loggerStore.loadStats()
    await vi.waitFor(() => expect(loggerStore.loadedStats).toBe(true))

    expect(fetchAllByIdMock).toHaveBeenCalledWith('user-1')
    expect(loggerStore.allLoggers).toEqual([{ dhikr_1: 1 }, { dhikr_1: 9 }])
  })

  it('delegates save to LoggerService with current state', () => {
    useUserStore().setUser({ uid: 'user-1' } as import('firebase/auth').User)

    const loggerStore = useLoggerStore()
    loggerStore.loggers = { dhikr_1: 12 } as LoggerMap
    loggerStore.save()

    expect(saveMock).toHaveBeenCalledWith({
      state: { loggers: { dhikr_1: 12 } },
      rootState: { User: { userid: 'user-1' } },
    })
  })
})

describe('race store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useRaceStore().racers = []
  })

  it('aggregates racer scores by counter id', () => {
    const store = useRaceStore()
    store.racers = [
      { dhikr_1: 4, dhikr_2: 0 } as LoggerMap,
      { dhikr_1: 9, dhikr_2: 2 } as LoggerMap,
    ]

    expect(store.scores.dhikr_1).toEqual([4, 9])
    expect(store.scores.dhikr_2).toEqual([0, 2])
  })

  it('loads racers from the current week snapshot', async () => {
    fetchAllMock.mockResolvedValueOnce({
      size: 2,
      forEach: (cb: (doc: { data: () => { loggers: LoggerMap } }) => void) => {
        cb({ data: () => ({ loggers: { dhikr_1: 3 } as LoggerMap }) })
        cb({ data: () => ({ loggers: { dhikr_1: 7 } as LoggerMap }) })
      },
    })

    const store = useRaceStore()
    await store.loadRacers()

    expect(fetchAllMock).toHaveBeenCalledOnce()
    expect(store.racers).toEqual([{ dhikr_1: 3 }, { dhikr_1: 7 }])
  })
})

describe('result store', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-12T12:00:00'))
    useTabStore().setActiveTab('dhikr')
    useResultStore().results = []
    useResultStore().loadedResults = false
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('orders last week scores for the active tab', () => {
    const store = useResultStore()
    store.results = [
      makeLoggerDoc('alice', { dhikr_1: 10, mindful_1: 4 }),
      makeLoggerDoc('bob', { dhikr_1: 25 }),
      makeLoggerDoc('carol', { dhikr_1: 0 }),
    ]

    const { data, start, end } = store.orderedByScore

    expect(start).toEqual(new Date(2024, 5, 3, 0, 0, 0, 0))
    expect(end).toEqual(new Date(2024, 5, 10, 0, 0, 0, 0))
    expect(data).toHaveLength(1)
    expect(data[0]).toMatchObject({
      title: 'SubhanAllah',
      users: [
        { username: 'bob', count: 25 },
        { username: 'alice', count: 10 },
      ],
    })
  })

  it('totals current-week scores across counters', () => {
    const store = useResultStore()
    store.results = [
      makeLoggerDoc('alice', { dhikr_1: 10 }),
      makeLoggerDoc('bob', { dhikr_1: 5, dhikr_2: 3 }),
    ]

    const { data, start, end } = store.totalCum

    expect(start).toEqual(new Date(2024, 5, 10, 0, 0, 0, 0))
    expect(end).toEqual(new Date(2024, 5, 17, 0, 0, 0, 0))
    expect(data.dhikr_1).toBe(15)
    expect(data.dhikr_2).toBe(3)
  })
})
