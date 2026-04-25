import useSWRInfinite from 'swr/infinite';
import {
  getRepoList,
  getRepoListKey,
} from '@/features/github/api/get-repo-list';
import type {
  Repository,
  SearchRepositoriesResponse,
} from '@/features/github/types/github';

export function useRepoList(keyword: string) {
  const { data, setSize, isValidating } =
    useSWRInfinite<SearchRepositoriesResponse>(
      (pageIndex, prev) => getRepoListKey(keyword, pageIndex, prev),
      getRepoList,
    );

  const repos: Repository[] = data ? data.flatMap((page) => page.items) : [];
  return { repos, setSize, isValidating };
}
