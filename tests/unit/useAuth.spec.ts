/// <reference types="vitest/globals" />
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { routeRequiresAnon, routeRequiresAuth } from '@/composables/useAuth'

function makeRoute(middleware?: string | string[]): RouteLocationNormalizedLoaded {
  return { meta: { middleware } } as RouteLocationNormalizedLoaded
}

describe('routeRequiresAuth', () => {
  it('returns true when middleware is auth', () => {
    expect(routeRequiresAuth(makeRoute('auth'))).toBe(true)
  })

  it('returns true when auth is in a middleware array', () => {
    expect(routeRequiresAuth(makeRoute(['close-menu', 'auth']))).toBe(true)
  })

  it('returns false when middleware is missing or different', () => {
    expect(routeRequiresAuth(makeRoute())).toBe(false)
    expect(routeRequiresAuth(makeRoute('anon'))).toBe(false)
    expect(routeRequiresAuth(makeRoute(['anon']))).toBe(false)
  })
})

describe('routeRequiresAnon', () => {
  it('returns true when middleware is anon', () => {
    expect(routeRequiresAnon(makeRoute('anon'))).toBe(true)
  })

  it('returns true when anon is in a middleware array', () => {
    expect(routeRequiresAnon(makeRoute(['anon']))).toBe(true)
  })

  it('returns false when middleware is missing or different', () => {
    expect(routeRequiresAnon(makeRoute())).toBe(false)
    expect(routeRequiresAnon(makeRoute('auth'))).toBe(false)
    expect(routeRequiresAnon(makeRoute(['auth']))).toBe(false)
  })
})
