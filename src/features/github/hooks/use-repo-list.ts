import { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import {
  getRepoList,
  getRepoListKey,
} from '@/features/github/api/get-repo-list'
import type {
  Repository,
  SearchRepositoriesResponse,
} from '@/features/github/types/github'

// NOTE: useSWRInfiniteを使ってリポジトリのリストを取得するカスタムフック
// docs: https://swr.vercel.app/docs/pagination#useswrinfinite
export const useRepoList = (keyword: string) => {
  const { data, setSize, isValidating } =
    useSWRInfinite<SearchRepositoriesResponse>(
      (pageIndex, prev) => getRepoListKey(keyword, pageIndex, prev),
      getRepoList,
    )

  useEffect(() => {
    setSize(1)
  }, [keyword, setSize])

  const repos: Repository[] = data ? data.flatMap((page) => page.items) : []
  return { repos, setSize, isValidating }
}
