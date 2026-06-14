/// <reference types="vitest/globals" />
import { vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
}))

vi.mock('@/utils/firebase', () => ({
  auth: null,
  db: null,
}))

describe('user store without Firebase', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useUserStore().setUser()
  })

  it('rejects login when auth is not initialized', async () => {
    await expect(
      useUserStore().login({ email: 'a@b.com', password: 'secret' }),
    ).rejects.toThrow('Firebase auth not initialized')
  })

  it('rejects register when Firebase is not initialized', async () => {
    await expect(
      useUserStore().register({
        username: 'alice',
        email: 'alice@example.com',
        password: 'secret',
      }),
    ).rejects.toThrow('Firebase not initialized')
  })

  it('rejects logout when auth is not initialized', async () => {
    await expect(useUserStore().logout()).rejects.toThrow(
      'Firebase auth not initialized',
    )
  })
})
