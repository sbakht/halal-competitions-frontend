/// <reference types="vitest/globals" />
import LocalStorage from '@/utils/LocalStorage'

describe('LocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  describe('incrementCount', () => {
    it('returns the default when nothing is stored', () => {
      expect(LocalStorage.incrementCount.get()).toBe(1)
    })

    it('parses a stored number', () => {
      window.localStorage.setItem('increment-count', '5')
      expect(LocalStorage.incrementCount.get()).toBe(5)
    })

    it('persists updates', () => {
      LocalStorage.incrementCount.set(3)
      expect(window.localStorage.getItem('increment-count')).toBe('3')
      expect(LocalStorage.incrementCount.get()).toBe(3)
    })
  })

  describe('language', () => {
    it('returns the default array when nothing is stored', () => {
      expect(LocalStorage.language.get()).toEqual(['english', 'arabic'])
    })

    it('parses a comma-separated list', () => {
      window.localStorage.setItem('language', 'english')
      expect(LocalStorage.language.get()).toEqual(['english'])
    })
  })

  describe('activeTabId', () => {
    it('returns dhikr by default', () => {
      expect(LocalStorage.activeTabId.get()).toBe('dhikr')
    })

    it('returns a stored tab id', () => {
      window.localStorage.setItem('activeTabId', 'fitness')
      expect(LocalStorage.activeTabId.get()).toBe('fitness')
    })
  })

  describe('carouselMode', () => {
    it('returns false by default', () => {
      expect(LocalStorage.carouselMode.get()).toBe(false)
    })

    it('parses stored boolean strings', () => {
      window.localStorage.setItem('carousel-mode', 'true')
      expect(LocalStorage.carouselMode.get()).toBe(true)

      window.localStorage.setItem('carousel-mode', 'false')
      expect(LocalStorage.carouselMode.get()).toBe(false)
    })
  })

  describe('generic getItem/setItem', () => {
    it('reads and writes arbitrary keys', () => {
      LocalStorage.setItem('custom-key', 'value')
      expect(LocalStorage.getItem('custom-key')).toBe('value')
    })
  })
})
