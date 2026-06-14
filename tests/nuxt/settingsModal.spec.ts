import { renderSuspended } from '@nuxt/test-utils/runtime'
import { fireEvent, screen } from '@testing-library/vue'
import SettingsModal from '@/components/SettingsModal.vue'

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('SettingsModal', () => {
  beforeAll(() => {
    vi.stubGlobal('ResizeObserver', ResizeObserverStub)
  })

  beforeEach(() => {
    window.localStorage.clear()
    const store = useLoggerStore()
    store.setIncrementCount(1)
    store.setLanguage(['english', 'arabic'])
  })

  it('renders increment and language settings when open', async () => {
    await renderSuspended(SettingsModal, {
      props: { modelValue: true },
    })

    expect(screen.getByRole('heading', { name: 'Settings' })).toBeTruthy()
    expect(screen.getByText('Increment')).toBeTruthy()
    expect(screen.getByText('Language')).toBeTruthy()
  })

  it('does not render dialog content when closed', async () => {
    await renderSuspended(SettingsModal, {
      props: { modelValue: false },
    })

    expect(screen.queryByRole('heading', { name: 'Settings' })).toBeNull()
  })

  it('updates increment count through the nested setting control', async () => {
    await renderSuspended(SettingsModal, {
      props: { modelValue: true },
    })

    const incrementInput = document.querySelector(
      'input[type="radio"][value="5"]',
    ) as HTMLInputElement
    await fireEvent.click(incrementInput)

    expect(useLoggerStore().incrementCount).toBe(5)
    expect(window.localStorage.getItem('increment-count')).toBe('5')
  })

  it('updates language preferences through the nested setting control', async () => {
    await renderSuspended(SettingsModal, {
      props: { modelValue: true },
    })

    const englishInput = document.querySelector(
      'input[type="checkbox"]#english',
    ) as HTMLInputElement
    await fireEvent.click(englishInput)

    expect(useLoggerStore().language).toEqual(['arabic'])
  })

  it('emits close when the dismiss button is clicked', async () => {
    const onUpdate = vi.fn()

    await renderSuspended(SettingsModal, {
      props: {
        modelValue: true,
        'onUpdate:modelValue': onUpdate,
      },
    })

    await fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(onUpdate).toHaveBeenCalledWith(false)
  })
})
