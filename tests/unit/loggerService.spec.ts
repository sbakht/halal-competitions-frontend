/// <reference types="vitest/globals" />
import { vi } from 'vitest'
import type { QueryDocumentSnapshot } from 'firebase/firestore'
import type { LoggerMap } from '@/types/firestore'
import LoggerService from '@/service/Logger'

const {
  getDocsMock,
  addDocMock,
  updateDocMock,
  docMock,
  collectionMock,
  queryMock,
  whereMock,
  limitMock,
} = vi.hoisted(() => ({
  getDocsMock: vi.fn(),
  addDocMock: vi.fn(),
  updateDocMock: vi.fn(),
  docMock: vi.fn((...args: unknown[]) => ({ path: args.join('/') })),
  collectionMock: vi.fn((...args: unknown[]) => ({ name: args[1] })),
  queryMock: vi.fn((...args: unknown[]) => args),
  whereMock: vi.fn((...args: unknown[]) => ({ where: args })),
  limitMock: vi.fn((n: number) => ({ limit: n })),
}))

vi.mock('firebase/firestore', () => ({
  collection: collectionMock,
  query: queryMock,
  where: whereMock,
  limit: limitMock,
  getDocs: getDocsMock,
  addDoc: addDocMock,
  updateDoc: updateDocMock,
  doc: docMock,
  Timestamp: {
    now: () => ({
      seconds: 1,
      nanoseconds: 0,
      toDate: () => new Date('2024-06-12T12:00:00'),
    }),
  },
}))

vi.mock('@/utils/firebase', () => ({
  db: { name: 'test-db' },
}))

function makeDoc(id: string, data: Record<string, unknown> = {}) {
  return {
    id,
    data: () => data,
  } as QueryDocumentSnapshot
}

describe('LoggerService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getDocsMock.mockResolvedValue({ docs: [], size: 0, forEach: vi.fn() })
    addDocMock.mockResolvedValue({ id: 'new-logger-doc' })
    updateDocMock.mockResolvedValue(undefined)
  })

  describe('fetchById', () => {
    it('returns docs and stores the first document reference', async () => {
      const doc = makeDoc('weekly-1', { loggers: { dhikr_1: 3 } })
      getDocsMock.mockResolvedValueOnce({ docs: [doc] })

      const service = new LoggerService()
      const result = await service.fetchById('user-1')

      expect(result.docs).toEqual([doc])
      expect(service.doc).toBe(doc)
      expect(whereMock).toHaveBeenCalledWith('userid', '==', 'user-1')
    })
  })

  describe('fetchAllById', () => {
    it('returns all historical docs for a user', async () => {
      const docs = [
        makeDoc('week-1', { loggers: { dhikr_1: 1 } }),
        makeDoc('week-2', { loggers: { dhikr_1: 5 } }),
      ]
      getDocsMock.mockResolvedValueOnce({ docs })

      const service = new LoggerService()
      const result = await service.fetchAllById('user-1')

      expect(result.docs).toHaveLength(2)
      expect(service.doc).toBeUndefined()
    })

    it('does not overwrite the weekly doc pointer used by save', async () => {
      const weeklyDoc = makeDoc('current-week', { loggers: { dhikr_1: 3 } })
      const historicalDocs = [
        makeDoc('old-week', { loggers: { dhikr_1: 1 } }),
        weeklyDoc,
      ]

      getDocsMock
        .mockResolvedValueOnce({ docs: [weeklyDoc] })
        .mockResolvedValueOnce({ docs: historicalDocs })

      const service = new LoggerService()
      await service.fetchById('user-1')
      await service.fetchAllById('user-1')

      expect(service.doc).toBe(weeklyDoc)

      service.save({
        state: { loggers: { dhikr_1: 10 } },
        rootState: { User: { userid: 'user-1' } },
      })

      expect(updateDocMock).toHaveBeenCalledOnce()
      expect(docMock).toHaveBeenCalledWith({ name: 'test-db' }, 'loggers', 'current-week')
    })
  })

  describe('fetchAll', () => {
    it('queries loggers for the current week', async () => {
      getDocsMock.mockResolvedValueOnce({ docs: [], size: 0, forEach: vi.fn() })

      const service = new LoggerService()
      await service.fetchAll()

      expect(collectionMock).toHaveBeenCalledWith({ name: 'test-db' }, 'loggers')
      expect(getDocsMock).toHaveBeenCalledOnce()
    })
  })

  describe('save', () => {
    const loggers = { dhikr_1: 10 } as LoggerMap

    it('updates an existing weekly doc', () => {
      const service = new LoggerService()
      service._setDoc(makeDoc('existing-doc'))

      service.save({
        state: { loggers },
        rootState: { User: { userid: 'user-1' } },
      })

      expect(updateDocMock).toHaveBeenCalledOnce()
      expect(addDocMock).not.toHaveBeenCalled()
      expect(docMock).toHaveBeenCalledWith({ name: 'test-db' }, 'loggers', 'existing-doc')
    })

    it('creates a new doc when none exists yet', async () => {
      getDocsMock.mockResolvedValueOnce({
        forEach: (cb: (doc: QueryDocumentSnapshot) => void) => {
          cb(makeDoc('user-profile', { username: 'alice' }))
        },
      })

      const service = new LoggerService()
      service.save({
        state: { loggers },
        rootState: { User: { userid: 'user-1' } },
      })

      await vi.waitFor(() => expect(addDocMock).toHaveBeenCalledOnce())

      const payload = addDocMock.mock.calls[0]![1] as Record<string, unknown>
      expect(payload).toMatchObject({
        username: 'alice',
        userid: 'user-1',
        loggers,
      })
      expect(service.doc).toEqual({ id: 'new-logger-doc' })
      expect(service.pendingCreation).toBe(false)
    })

    it('does not start a second create while one is pending', () => {
      const service = new LoggerService()
      service.pendingCreation = true

      service.save({
        state: { loggers },
        rootState: { User: { userid: 'user-1' } },
      })

      expect(addDocMock).not.toHaveBeenCalled()
      expect(updateDocMock).not.toHaveBeenCalled()
    })

    it('resets pendingCreation when username lookup fails', async () => {
      getDocsMock.mockRejectedValueOnce(new Error('network error'))

      const service = new LoggerService()
      service.save({
        state: { loggers },
        rootState: { User: { userid: 'user-1' } },
      })

      await vi.waitFor(() => expect(service.pendingCreation).toBe(false))
      expect(addDocMock).not.toHaveBeenCalled()
    })

    it('skips update when the stored doc has no id', () => {
      const service = new LoggerService()
      service._setDoc({} as QueryDocumentSnapshot)

      service.save({
        state: { loggers },
        rootState: { User: { userid: 'user-1' } },
      })

      expect(updateDocMock).not.toHaveBeenCalled()
    })

    it('does not create a logger doc without a userid', () => {
      const service = new LoggerService()

      service.save({
        state: { loggers },
        rootState: { User: { userid: null } },
      })

      expect(addDocMock).not.toHaveBeenCalled()
      expect(service.pendingCreation).toBe(false)
    })

    it('resets pendingCreation when addDoc fails', async () => {
      getDocsMock.mockResolvedValueOnce({
        forEach: (cb: (doc: QueryDocumentSnapshot) => void) => {
          cb(makeDoc('user-profile', { username: 'alice' }))
        },
      })
      addDocMock.mockRejectedValueOnce(new Error('write failed'))

      const service = new LoggerService()
      service.save({
        state: { loggers },
        rootState: { User: { userid: 'user-1' } },
      })

      await vi.waitFor(() => expect(service.pendingCreation).toBe(false))
    })
  })
})
