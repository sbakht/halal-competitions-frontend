/// <reference types="vitest/globals" />
import { mapObj } from '@/utils'

describe('utils', () => {
  it('mapObj maps object keys through callback', () => {
    const result = mapObj({ a: 1, b: 2 }, (key, val) => `${key}:${val}`)
    expect(result).toEqual(['a:1', 'b:2'])
  })
})
