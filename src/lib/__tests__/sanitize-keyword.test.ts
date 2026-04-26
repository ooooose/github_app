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

  it('バックスラッシュを除去する', () => {
    expect(sanitizeKeyword('react\\hooks')).toBe('reacthooks')
  })

  it('パーセントを除去する', () => {
    expect(sanitizeKeyword('react%20hooks')).toBe('react20hooks')
  })

  it('プラスを除去する', () => {
    expect(sanitizeKeyword('react+hooks')).toBe('reacthooks')
  })

  it('ハッシュを除去する', () => {
    expect(sanitizeKeyword('react#hooks')).toBe('reacthooks')
  })

  it('アンパサンドを除去する', () => {
    expect(sanitizeKeyword('react&hooks')).toBe('reacthooks')
  })

  it('イコールを除去する', () => {
    expect(sanitizeKeyword('react=hooks')).toBe('reacthooks')
  })

  it('クエスチョンマークを除去する', () => {
    expect(sanitizeKeyword('react?hooks')).toBe('reacthooks')
  })

  it('スラッシュを除去する', () => {
    expect(sanitizeKeyword('react/hooks')).toBe('reacthooks')
  })

  it('複数の除去対象文字が混在する場合', () => {
    expect(sanitizeKeyword('re act+ho&oks?')).toBe('reacthooks')
  })

  it('空文字列はそのまま返す', () => {
    expect(sanitizeKeyword('')).toBe('')
  })

  it('除去対象文字のみの場合は空文字列を返す', () => {
    expect(sanitizeKeyword('  %+#&=?/')).toBe('')
  })
})
