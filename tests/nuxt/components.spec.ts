import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime'
import { fireEvent, screen } from '@testing-library/vue'
import closeMenuMiddleware from '@/middleware/close-menu.global'
import BaseAlert from '@/components/shared/BaseAlert.vue'
import PageHeading from '@/components/helpers/page.heading.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import TabItem from '@/components/tabs/pure/item.vue'

describe('close-menu middleware', () => {
  it('closes the mobile menu on navigation', () => {
    const navStore = useNavStore()
    navStore.openMobileMenu()

    closeMenuMiddleware()

    expect(navStore.isMobileMenuOpen).toBe(false)
  })
})

describe('BaseAlert', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows an info alert until dismissed', async () => {
    await renderSuspended(BaseAlert, {
      props: { storageId: 'test-alert', type: 'info' },
      slots: { default: 'Heads up' },
    })

    expect(screen.getByText('Heads up')).toBeTruthy()

    await fireEvent.click(screen.getByRole('button'))

    expect(window.localStorage.getItem('test-alert')).toBe('true')
    expect(screen.queryByText('Heads up')).toBeNull()
  })

  it('stays hidden when the alert was previously dismissed', async () => {
    window.localStorage.setItem('seen-alert', 'true')

    await renderSuspended(BaseAlert, {
      props: { storageId: 'seen-alert', type: 'warning' },
      slots: { default: 'Already seen' },
    })

    expect(screen.queryByText('Already seen')).toBeNull()
  })
})

describe('PageHeading', () => {
  it('renders the page title and slot content', async () => {
    await renderSuspended(PageHeading, {
      props: { title: 'Dashboard' },
      slots: { default: 'Actions' },
    })

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeTruthy()
    expect(screen.getByText('Actions')).toBeTruthy()
  })
})

describe('ProgressBar', () => {
  it('renders progress as a percentage width', async () => {
    await renderSuspended(ProgressBar, {
      props: {
        label: 'Dhikr goal',
        current: 25,
        total: 100,
      },
    })

    expect(screen.getByText('Dhikr goal')).toBeTruthy()
    expect(screen.getByText('25 / 100')).toBeTruthy()
    expect(screen.getByText('25%')).toBeTruthy()
    expect(document.querySelector('[style*="width: 25%"]')).toBeTruthy()
  })
})

describe('TabItem', () => {
  it('emits the tab id when clicked', async () => {
    const wrapper = await mountSuspended(TabItem, {
      props: {
        id: 'mindful',
        name: 'Mindful',
        isActive: false,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('change')).toEqual([['mindful']])
  })

  it('highlights the active tab', async () => {
    await renderSuspended(TabItem, {
      props: {
        id: 'dhikr',
        name: 'Dhikr',
        isActive: true,
      },
    })

    expect(screen.getByRole('button', { name: 'Dhikr' }).className).toContain('border-indigo-500')
  })
})
