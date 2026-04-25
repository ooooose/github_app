import { describe, it, expect } from 'vitest'
import { formatCount } from '@/lib/format-count'

describe('formatCount', () => {
  it('1000未満はそのまま返す', () => {
    expect(formatCount(999)).toBe('999')
  })

  it('1000以上はk表記にする', () => {
    expect(formatCount(1200)).toBe('1.2k')
  })
})
