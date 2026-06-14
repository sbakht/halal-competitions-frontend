import { renderSuspended } from '@nuxt/test-utils/runtime'
import { fireEvent, screen } from '@testing-library/vue'
import CompetitionsTabs from '@/components/tabs/tabs.vue'

describe('CompetitionsTabs', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useTabStore().setActiveTab('dhikr')
  })

  it('switches tabs from the desktop tab bar', async () => {
    await renderSuspended(CompetitionsTabs)

    await fireEvent.click(screen.getByRole('button', { name: 'Mindful Minutes' }))

    expect(useTabStore().activeTabId).toBe('mindful')
    expect(window.localStorage.getItem('activeTabId')).toBe('mindful')
  })

  it('switches tabs from the mobile select control', async () => {
    await renderSuspended(CompetitionsTabs)

    await fireEvent.update(screen.getByRole('combobox'), 'fitness')

    expect(useTabStore().activeTabId).toBe('fitness')
    expect(window.localStorage.getItem('activeTabId')).toBe('fitness')
  })
})
