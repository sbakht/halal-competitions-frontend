import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime'
import { fireEvent, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import type { ActiveLogger } from '@/types/competition'
import BaseIncrement from '@/components/dashboard/BaseIncrement.vue'
import IncrementSlide from '@/components/dashboard/IncrementSlide.vue'
import ViewModeIcons from '@/components/dashboard/ViewModeIcons.vue'
import DashboardCompetition from '@/components/dashboard/competition.vue'
import IncrementCarousel from '@/components/dashboard/IncrementCarousel.vue'
import IncrementCount from '@/components/dashboard/IncrementCount.vue'
import LanguageSetting from '@/components/dashboard/LanguageSetting.vue'
import BaseTable from '@/components/dashboard/BaseTable.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import Loader from '@/components/helpers/loader.vue'

const logger: ActiveLogger = {
  id: 'dhikr_1',
  title: 'SubhanAllah',
  arabic: 'سُبْحَانَ ٱللَّٰهِ',
  count: 12,
  target: 20,
}

describe('BaseIncrement', () => {
  beforeEach(() => {
    useLoggerStore().setLanguage(['english', 'arabic'])
  })

  it('shows english title, arabic text, count, and target', async () => {
    await renderSuspended(BaseIncrement, {
      props: { data: logger },
    })

    expect(screen.getByText('SubhanAllah')).toBeTruthy()
    expect(screen.getByText('سُبْحَانَ ٱللَّٰهِ')).toBeTruthy()
    expect(screen.getByText('12')).toBeTruthy()
    expect(screen.getByText('(20)')).toBeTruthy()
  })

  it('hides english when only arabic is selected', async () => {
    useLoggerStore().setLanguage(['arabic'])

    await renderSuspended(BaseIncrement, {
      props: { data: logger },
    })

    expect(screen.queryByText('SubhanAllah')).toBeNull()
    expect(screen.getByText('سُبْحَانَ ٱللَّٰهِ')).toBeTruthy()
  })
})

describe('IncrementSlide', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    const store = useLoggerStore()
    store.loggers = { dhikr_1: 5 }
    store.setIncrementCount(2)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('increments through the shared debounced composable', async () => {
    await renderSuspended(IncrementSlide, {
      props: { logger },
    })

    await fireEvent.click(screen.getByRole('button'))

    expect(useLoggerStore().loggers.dhikr_1).toBe(7)
  })
})

describe('ViewModeIcons', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useLoggerStore().setCarouselMode(false)
  })

  it('persists carousel mode when toggled', async () => {
    await renderSuspended(ViewModeIcons)

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(2)

    await fireEvent.click(buttons[0]!)
    expect(useLoggerStore().carouselMode).toBe(true)
    expect(window.localStorage.getItem('carousel-mode')).toBe('true')

    await fireEvent.click(buttons[1]!)
    expect(useLoggerStore().carouselMode).toBe(false)
  })
})

describe('DashboardCompetition', () => {
  it('renders increment buttons in grid mode', async () => {
    useLoggerStore().setLanguage(['english', 'arabic'])

    await renderSuspended(DashboardCompetition, {
      props: { loggers: [logger], carousel: false },
    })

    expect(screen.getByRole('button', { name: /SubhanAllah/i })).toBeTruthy()
  })

  it('renders the carousel in carousel mode', async () => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    })

    await renderSuspended(DashboardCompetition, {
      props: { loggers: [logger], carousel: true },
    })

    expect(document.querySelector('.increment-carousel')).toBeTruthy()
  })
})

describe('IncrementCarousel', () => {
  it('sets scroll height from the viewport on mount', async () => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 900,
    })

    await renderSuspended(IncrementCarousel, {
      props: { data: [logger] },
    })

    const carousel = document.querySelector('.increment-carousel') as HTMLElement
    expect(carousel.style.height).toBe(`${900 - 64 - 32 - 24 - 120}px`)
  })
})

describe('IncrementCount', () => {
  it('emits the selected increment amount', async () => {
    const wrapper = await mountSuspended(IncrementCount, {
      props: { modelValue: 1 },
    })

    await wrapper.get('input[value="5"]').setValue(true)

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([5])
  })
})

describe('LanguageSetting', () => {
  it('emits language changes from checkbox selection', async () => {
    const wrapper = await mountSuspended(LanguageSetting, {
      props: { modelValue: ['english', 'arabic'] },
    })

    const english = wrapper.get('#english')
    await english.setValue(false)

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['arabic']])
  })

  it('falls back to both languages when the selection becomes empty', async () => {
    const wrapper = await mountSuspended(LanguageSetting, {
      props: { modelValue: ['english'] },
    })

    await wrapper.get('#english').setValue(false)

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([
      ['english', 'arabic'],
    ])
  })
})

describe('BaseIncrement branches', () => {
  it('shows the title when arabic text is missing', async () => {
    useLoggerStore().setLanguage(['arabic'])

    await renderSuspended(BaseIncrement, {
      props: {
        data: {
          id: 'fitness_1',
          title: 'Pushups',
          count: 3,
        },
      },
    })

    expect(screen.getByText('Pushups')).toBeTruthy()
  })
})

describe('ProgressBar', () => {
  it('defaults missing totals to zero percent progress', async () => {
    await renderSuspended(ProgressBar, {
      props: {
        label: 'Open goal',
      },
    })

    expect(screen.getByText('Open goal')).toBeTruthy()
    expect(screen.getByText('0%')).toBeTruthy()
    expect(document.querySelector('[style*="width: 0%"]')).toBeTruthy()
  })
})

describe('BaseTable', () => {
  it('renders stats rows with alternating row styles', async () => {
    await renderSuspended(BaseTable, {
      props: {
        data: [
          { name: 'SubhanAllah', count: 100, avg: 25, avgPerDay: 4 },
          { name: 'Alhamdulillah', count: 80, avg: 20, avgPerDay: 3 },
        ],
      },
    })

    expect(screen.getByText('SubhanAllah')).toBeTruthy()
    expect(screen.getByText('100')).toBeTruthy()
    expect(screen.getByText('25')).toBeTruthy()
    expect(screen.getByText('4')).toBeTruthy()

    const rows = document.querySelectorAll('tbody tr')
    expect(rows[0]?.className).toContain('bg-white')
    expect(rows[1]?.className).toContain('bg-gray-50')
  })
})

describe('Loader', () => {
  it('renders the loading image', async () => {
    await renderSuspended(Loader)

    expect(document.querySelector('img')).toBeTruthy()
  })
})
