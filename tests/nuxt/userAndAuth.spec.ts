import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { vi } from 'vitest'
import type { User } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { addDoc } from 'firebase/firestore'
import { useAuth } from '@/composables/useAuth'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const { navigateToMock } = vi.hoisted(() => ({
  navigateToMock: vi.fn(),
}))

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}))

vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/firestore')>()
  return {
    ...actual,
    collection: vi.fn(() => ({})),
    addDoc: vi.fn(),
  }
})

vi.mock('@/utils/firebase', () => ({
  auth: {},
  db: {},
}))

mockNuxtImport('navigateTo', () => navigateToMock)

function makeRoute(
  path: string,
  middleware?: string | string[],
): RouteLocationNormalizedLoaded {
  return { path, meta: { middleware } } as RouteLocationNormalizedLoaded
}

function makeUser(uid: string): User {
  return { uid } as User
}

describe('user store', () => {
  beforeEach(() => {
    const store = useUserStore()
    store.pendingAuth = true
    store.setUser()
    vi.clearAllMocks()
  })

  it('tracks login state from userid', () => {
    const store = useUserStore()

    expect(store.isLoggedIn).toBe(false)

    store.setUser(makeUser('user-1'))

    expect(store.isLoggedIn).toBe(true)
    expect(store.userid).toBe('user-1')
  })

  it('clears auth state on logout', async () => {
    vi.mocked(signOut).mockResolvedValueOnce(undefined)

    const store = useUserStore()
    store.setUser(makeUser('user-1'))

    await store.logout()

    expect(signOut).toHaveBeenCalledOnce()
    expect(store.user).toBeNull()
    expect(store.userid).toBeNull()
  })

  it('logs in with email and password', async () => {
    const firebaseUser = makeUser('user-1')
    vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce({
      user: firebaseUser,
    } as Awaited<ReturnType<typeof signInWithEmailAndPassword>>)

    const store = useUserStore()
    await store.login({ email: 'a@b.com', password: 'secret' })

    expect(signInWithEmailAndPassword).toHaveBeenCalledOnce()
    expect(store.userid).toBe('user-1')
  })

  it('registers a user profile then signs them in', async () => {
    const firebaseUser = makeUser('user-2')
    vi.mocked(createUserWithEmailAndPassword).mockResolvedValueOnce({
      user: firebaseUser,
    } as Awaited<ReturnType<typeof createUserWithEmailAndPassword>>)
    vi.mocked(addDoc).mockResolvedValueOnce({ id: 'profile-1' } as Awaited<ReturnType<typeof addDoc>>)
    vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce({
      user: firebaseUser,
    } as Awaited<ReturnType<typeof signInWithEmailAndPassword>>)

    const store = useUserStore()
    await store.register({
      username: 'alice',
      email: 'alice@example.com',
      password: 'secret',
    })

    expect(createUserWithEmailAndPassword).toHaveBeenCalledOnce()
    expect(addDoc).toHaveBeenCalledOnce()
    expect(store.userid).toBe('user-2')
  })
})

describe('useAuth composable', () => {
  beforeEach(() => {
    const userStore = useUserStore()
    userStore.pendingAuth = false
    userStore.setUser()
    navigateToMock.mockClear()
    vi.clearAllMocks()
  })

  it('allows protected routes while auth is pending', () => {
    useUserStore().pendingAuth = true

    expect(useAuth().allowProtectedRoute()).toBe(true)
  })

  it('redirects anonymous users away from login routes once auth resolves', () => {
    const userStore = useUserStore()
    userStore.pendingAuth = false
    userStore.setUser(makeUser('user-1'))

    expect(useAuth().shouldRedirectFromAnon()).toBe(true)
  })

  it('does not redirect anonymous routes while auth is still pending', () => {
    useUserStore().pendingAuth = true

    expect(useAuth().shouldRedirectFromAnon()).toBe(false)
  })

  it('syncs a signed-in user away from anon routes', () => {
    const userStore = useUserStore()
    const { syncAuthState } = useAuth()

    syncAuthState(makeUser('user-1'), makeRoute('/login', 'anon'))

    expect(navigateToMock).toHaveBeenCalledWith('/dashboard')
    expect(userStore.userid).toBe('user-1')
    expect(userStore.pendingAuth).toBe(false)
  })

  it('loads dashboard data when auth resolves on the dashboard route', () => {
    const loggerSpy = vi.spyOn(useLoggerStore(), 'loadDashboard').mockImplementation(() => {})
    const { syncAuthState } = useAuth()

    syncAuthState(makeUser('user-1'), makeRoute('/dashboard', 'auth'))

    expect(loggerSpy).toHaveBeenCalledOnce()
    expect(navigateToMock).not.toHaveBeenCalled()
  })

  it('loads stats when auth resolves on the stats route', () => {
    const statsSpy = vi.spyOn(useLoggerStore(), 'loadStats').mockImplementation(() => {})
    const { syncAuthState } = useAuth()

    syncAuthState(makeUser('user-1'), makeRoute('/stats', 'auth'))

    expect(statsSpy).toHaveBeenCalledOnce()
  })

  it('redirects signed-in users from home to dashboard', () => {
    const { syncAuthState } = useAuth()

    syncAuthState(makeUser('user-1'), makeRoute('/'))

    expect(navigateToMock).toHaveBeenCalledWith('/dashboard')
  })

  it('redirects signed-out users away from protected routes', () => {
    const { syncAuthState } = useAuth()

    syncAuthState(null, makeRoute('/dashboard', 'auth'))

    expect(navigateToMock).toHaveBeenCalledWith('/login')
    expect(useUserStore().userid).toBeNull()
  })
})
