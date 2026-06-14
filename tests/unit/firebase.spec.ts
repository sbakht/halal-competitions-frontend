/// <reference types="vitest/globals" />
import { vi } from 'vitest'

const {
  initializeAppMock,
  getAppsMock,
  getAuthMock,
  getFirestoreMock,
} = vi.hoisted(() => ({
  initializeAppMock: vi.fn(() => ({ name: 'test-app' })),
  getAppsMock: vi.fn(() => [] as { name: string }[]),
  getAuthMock: vi.fn(() => ({ currentUser: null })),
  getFirestoreMock: vi.fn(() => ({ type: 'firestore' })),
}))

vi.mock('firebase/app', () => ({
  initializeApp: initializeAppMock,
  getApps: getAppsMock,
}))

vi.mock('firebase/auth', () => ({
  getAuth: getAuthMock,
}))

vi.mock('firebase/firestore', () => ({
  getFirestore: getFirestoreMock,
}))

import { initFirebase } from '@/utils/firebase'

describe('initFirebase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getAppsMock.mockReturnValue([])
  })

  it('warns and returns null clients when apiKey is missing', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const result = initFirebase({ projectId: 'test-project' })

    expect(result).toEqual({ app: null, auth: null, db: null })
    expect(warnSpy).toHaveBeenCalledWith(
      '[firebase] Missing config — set NUXT_PUBLIC_FIREBASE_* in .env',
    )

    warnSpy.mockRestore()
  })

  it('initializes app, auth, and firestore when config is present', () => {
    const config = {
      apiKey: 'test-key',
      authDomain: 'test.firebaseapp.com',
      projectId: 'test-project',
    }

    const result = initFirebase(config)

    expect(initializeAppMock).toHaveBeenCalledWith(config)
    expect(getAuthMock).toHaveBeenCalledOnce()
    expect(getFirestoreMock).toHaveBeenCalledOnce()
    expect(result.app).toEqual({ name: 'test-app' })
    expect(result.auth).toEqual({ currentUser: null })
    expect(result.db).toEqual({ type: 'firestore' })
  })

  it('reuses an existing Firebase app when one is already initialized', () => {
    const existingApp = { name: 'existing-app' }
    getAppsMock.mockReturnValue([existingApp])

    initFirebase({
      apiKey: 'test-key',
      projectId: 'test-project',
    })

    expect(initializeAppMock).not.toHaveBeenCalled()
    expect(getAuthMock).toHaveBeenCalledWith(existingApp)
  })
})
