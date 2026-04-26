// features/github/api/get-repo-list.ts
import type { SearchRepositoriesResponse } from '@/features/github/types/github'
import { BASE_URL } from '@/constants/api'
import { sanitizeKeyword } from '@/lib/sanitize-keyword'

export const getRepoListKey = (
  keyword: string,
  pageIndex: number,
  prev: SearchRepositoriesResponse | null,
): string | null => {
  const sanitized = sanitizeKeyword(keyword)
  if (!sanitized) return null
  if (prev && prev.items.length === 0) return null
  return `${BASE_URL}/api/github?q=${encodeURIComponent(sanitized)}&page=${
    pageIndex + 1
  }`
}

export const getRepoList = async (
  url: string,
): Promise<SearchRepositoriesResponse> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch repositories')
  return res.json()
}
