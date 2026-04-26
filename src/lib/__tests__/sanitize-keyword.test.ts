import { sanitizeKeyword } from '@/lib/sanitize-keyword'

describe('sanitizeKeyword', () => {
  it('半角スペースを除去する', () => {
    expect(sanitizeKeyword('react hooks')).toBe('reacthooks')
  })

  it('全角スペースを除去する', () => {
    expect(sanitizeKeyword('react　hooks')).toBe('reacthooks')
  })

  it('改行やタブも除去する', () => {
    expect(sanitizeKeyword('re\nac\tt')).toBe('react')
  })
})
