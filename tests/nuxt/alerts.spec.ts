import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import AlertBugs from '@/components/alerts/AlertBugs.vue'
import AlertUpdates from '@/components/alerts/AlertUpdates.vue'
import AlertUsername from '@/components/alerts/AlertUsername.vue'
import TheAlerts from '@/components/alerts/TheAlerts.vue'

describe('AlertBugs', () => {
  it('lists recent bug fixes and improvements', async () => {
    await renderSuspended(AlertBugs)

    expect(screen.getByText("What's new")).toBeTruthy()
    expect(screen.getByText(/La hawla wala quwata illah bilah/i)).toBeTruthy()
    expect(screen.getByText(/arabic names to the dhikr/i)).toBeTruthy()
  })
})

describe('AlertUpdates', () => {
  it('links to stats and challenges pages', async () => {
    await renderSuspended(AlertUpdates)

    expect(screen.getByText('Whats New')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Your statistics/i }).getAttribute('href')).toBe(
      '/stats',
    )
    expect(screen.getByRole('link', { name: /Group Challenges/i }).getAttribute('href')).toBe(
      '/challenges',
    )
  })
})

describe('AlertUsername', () => {
  it('renders the username privacy warning', async () => {
    await renderSuspended(AlertUsername)

    expect(screen.getByText(/fake name/i)).toBeTruthy()
    expect(screen.getByText('TheHappyMuslim')).toBeTruthy()
  })
})

describe('TheAlerts', () => {
  it('renders the alerts container', async () => {
    await renderSuspended(TheAlerts)

    expect(document.querySelector('div')).toBeTruthy()
  })
})
