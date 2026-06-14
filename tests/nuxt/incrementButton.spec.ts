import { renderSuspended } from '@nuxt/test-utils/runtime'
import { fireEvent, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import IncrementButton from '@/components/dashboard/IncrementButton.vue'
import type { ActiveLogger } from '@/types/competition'

const logger: ActiveLogger = {
  id: 'dhikr_1',
  title: 'SubhanAllah',
  arabic: 'سُبْحَانَ ٱللَّٰهِ',
  count: 5,
}

function getIncrementButton() {
  return screen.getByRole('button', { name: /SubhanAllah/i })
}

describe('IncrementButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    const store = useLoggerStore()
    store.loggers = { dhikr_1: 5 }
    store.setIncrementCount(2)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('increments the store counter by incrementCount on click', async () => {
    await renderSuspended(IncrementButton, {
      props: { logger },
    })

    await fireEvent.click(getIncrementButton())

    expect(useLoggerStore().loggers.dhikr_1).toBe(7)
  })

  it('debounces save until 2s after the last click', async () => {
    const store = useLoggerStore()
    const saveSpy = vi.spyOn(store, 'save')

    await renderSuspended(IncrementButton, {
      props: { logger },
    })

    const button = getIncrementButton()
    await fireEvent.click(button)
    await fireEvent.click(button)

    expect(store.loggers.dhikr_1).toBe(9)
    expect(saveSpy).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1999)
    expect(saveSpy).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1)
    expect(saveSpy).toHaveBeenCalledOnce()
  })
})
