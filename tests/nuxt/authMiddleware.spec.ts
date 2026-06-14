import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { vi } from 'vitest'
import authMiddleware from '@/middleware/auth'
import anonMiddleware from '@/middleware/anon'

const { allowProtectedRouteMock, shouldRedirectFromAnonMock, navigateToMock } = vi.hoisted(() => ({
  allowProtectedRouteMock: vi.fn(),
  shouldRedirectFromAnonMock: vi.fn(),
  navigateToMock: vi.fn(),
}))

mockNuxtImport('useAuth', () => () => ({
  allowProtectedRoute: allowProtectedRouteMock,
  shouldRedirectFromAnon: shouldRedirectFromAnonMock,
}))

mockNuxtImport('navigateTo', () => navigateToMock)

describe('auth middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('allows navigation when the route is protected and auth is pending or present', () => {
    allowProtectedRouteMock.mockReturnValue(true)

    const result = authMiddleware()

    expect(result).toBeUndefined()
    expect(navigateToMock).not.toHaveBeenCalled()
  })

  it('redirects to login when the route is protected and auth is denied', () => {
    allowProtectedRouteMock.mockReturnValue(false)

    authMiddleware()

    expect(navigateToMock).toHaveBeenCalledWith('/login')
  })
})

describe('anon middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('allows navigation for anonymous users', () => {
    shouldRedirectFromAnonMock.mockReturnValue(false)

    const result = anonMiddleware()

    expect(result).toBeUndefined()
    expect(navigateToMock).not.toHaveBeenCalled()
  })

  it('redirects logged-in users to the dashboard', () => {
    shouldRedirectFromAnonMock.mockReturnValue(true)

    anonMiddleware()

    expect(navigateToMock).toHaveBeenCalledWith('/dashboard')
  })
})
