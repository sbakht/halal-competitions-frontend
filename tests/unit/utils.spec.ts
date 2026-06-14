/// <reference types="vitest/globals" />
import { vi } from 'vitest'
import {
  addDays,
  dateRange,
  dateRangeLastWeek,
  formatDate,
  groupBy,
  mapObj,
} from '@/utils'

describe('addDays', () => {
  it('adds positive days without mutating the original date', () => {
    const start = new Date(2024, 5, 10)
    const result = addDays(start, 7)

    expect(result).toEqual(new Date(2024, 5, 17))
    expect(start).toEqual(new Date(2024, 5, 10))
  })

  it('subtracts days when given a negative offset', () => {
    const start = new Date(2024, 5, 10)
    expect(addDays(start, -7)).toEqual(new Date(2024, 5, 3))
  })
})

describe('formatDate', () => {
  it('zero-pads month and day', () => {
    expect(formatDate(new Date(2024, 5, 5))).toBe('06/05/2024')
  })

  it('does not zero-pad double-digit month and day', () => {
    expect(formatDate(new Date(2024, 11, 15))).toBe('12/15/2024')
  })
})

describe('groupBy', () => {
  it('returns an empty object for an empty array', () => {
    expect(groupBy([], 'category')).toEqual({})
  })

  it('groups items by the given key', () => {
    const items = [
      { id: 1, category: 'a' },
      { id: 2, category: 'b' },
      { id: 3, category: 'a' },
    ]

    expect(groupBy(items, 'category')).toEqual({
      a: [
        { id: 1, category: 'a' },
        { id: 3, category: 'a' },
      ],
      b: [{ id: 2, category: 'b' }],
    })
  })

  it('returns an empty object when grouping fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const badItem = {
      get missing() {
        throw new Error('invalid key access')
      },
    }

    expect(groupBy([badItem as { id: number }], 'missing' as 'id')).toEqual({})
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})

describe('mapObj', () => {
  it('maps object keys through callback', () => {
    const result = mapObj({ a: 1, b: 2 }, (key, val) => `${key}:${val}`)
    expect(result).toEqual(['a:1', 'b:2'])
  })
})

describe('dateRange', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-12T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns Monday through the following Monday for the current week', () => {
    const { start, end } = dateRange()

    expect(start).toEqual(new Date(2024, 5, 10, 0, 0, 0, 0))
    expect(end).toEqual(new Date(2024, 5, 17, 0, 0, 0, 0))
  })

  it('returns the previous Monday through the current Monday for last week', () => {
    const { start, end } = dateRangeLastWeek()

    expect(start).toEqual(new Date(2024, 5, 3, 0, 0, 0, 0))
    expect(end).toEqual(new Date(2024, 5, 10, 0, 0, 0, 0))
  })
})
