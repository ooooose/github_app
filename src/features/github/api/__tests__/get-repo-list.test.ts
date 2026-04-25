import { getRepoListKey } from '../get-repo-list'
import type { SearchRepositoriesResponse } from '@/features/github/types/github'

const mockResponse = (itemCount: number): SearchRepositoriesResponse =>
  ({
    total_count: itemCount,
    incomplete_results: false,
    items: Array.from({ length: itemCount }, (_, i) => ({ id: i })),
  }) as SearchRepositoriesResponse

describe('getRepoListKey', () => {
  describe('nullを返すケース', () => {
    it('keywordが空文字の場合はnullを返す', () => {
      expect(getRepoListKey('', 0, null)).toBeNull()
    })

    it('前のページのitemsが空の場合はnullを返す', () => {
      expect(getRepoListKey('react', 1, mockResponse(0))).toBeNull()
    })
  })

  describe('URLを返すケース', () => {
    it('初回ページ(pageIndex: 0)のURLを返す', () => {
      const url = getRepoListKey('react', 0, null)
      expect(url).toContain('/api/github')
      expect(url).toContain('q=react')
      expect(url).toContain('page=1')
    })

    it('2ページ目のURLを返す', () => {
      const url = getRepoListKey('react', 1, mockResponse(30))
      expect(url).toContain('page=2')
    })

    it('keywordがURLに含まれる', () => {
      const url = getRepoListKey('react hooks', 0, null)
      expect(url).toContain('q=react')
    })
  })
})
