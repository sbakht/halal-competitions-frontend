import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime'
import { fireEvent, screen } from '@testing-library/vue'
import type { User } from 'firebase/auth'
import TheNav from '@/components/nav/TheNav.vue'
import MobileMenu from '@/components/nav/MobileMenu.vue'
import BaseNavLink from '@/components/nav/BaseNavLink.vue'

function makeUser(uid: string): User {
  return { uid } as User
}

describe('BaseNavLink', () => {
  it('renders a named route link', async () => {
    await renderSuspended(BaseNavLink, {
      props: {
        to: '/dashboard',
        name: 'Dashboard',
      },
    })

    const link = screen.getByRole('link', { name: 'Dashboard' })
    expect(link.getAttribute('href')).toContain('/dashboard')
  })
})

describe('TheNav', () => {
  beforeEach(() => {
    useNavStore().closeMobileMenu()
    useUserStore().setUser()
  })

  it('shows public navigation links when logged out', async () => {
    await renderSuspended(TheNav)

    expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Login' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'About' }).length).toBeGreaterThan(0)
  })

  it('shows authenticated navigation links when logged in', async () => {
    useUserStore().setUser(makeUser('user-1'))

    await renderSuspended(TheNav)

    expect(screen.getAllByRole('link', { name: 'Dashboard' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Your Statistics' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Log out' }).length).toBeGreaterThan(0)
  })

  it('toggles the mobile menu from the header button', async () => {
    const navStore = useNavStore()

    await renderSuspended(TheNav)

    await fireEvent.click(screen.getByRole('button', { name: 'Open main menu' }))
    expect(navStore.isMobileMenuOpen).toBe(true)

    await fireEvent.click(screen.getByRole('button', { name: 'Open main menu' }))
    expect(navStore.isMobileMenuOpen).toBe(false)
  })
})

describe('MobileMenu', () => {
  it('renders anonymous links when open and logged out', async () => {
    await renderSuspended(MobileMenu, {
      props: { isOpen: true, isLoggedIn: false },
    })

    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('Login')).toBeTruthy()
    expect(screen.getByText('Register')).toBeTruthy()
    expect(screen.getByText('Results')).toBeTruthy()
  })

  it('renders authenticated links when open and logged in', async () => {
    await renderSuspended(MobileMenu, {
      props: { isOpen: true, isLoggedIn: true },
    })

    expect(screen.getByText('Dashboard')).toBeTruthy()
    expect(screen.getByText('Your Statistics')).toBeTruthy()
    expect(screen.getByText('Log out')).toBeTruthy()
  })

  it('hides the panel when closed', async () => {
    await renderSuspended(MobileMenu, {
      props: { isOpen: false, isLoggedIn: false },
    })

    expect(document.querySelector('.md\\:hidden.hidden')).toBeTruthy()
  })
})
