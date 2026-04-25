// features/github/api/get-repo-list.ts
import type { SearchRepositoriesResponse } from '@/features/github/types/github';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export function getRepoListKey(
  keyword: string,
  pageIndex: number,
  prev: SearchRepositoriesResponse | null,
): string | null {
  if (!keyword) return null;
  if (prev && prev.items.length === 0) return null;
  return `${BASE_URL}/api/github?q=${keyword}&page=${pageIndex + 1}`;
}

export async function getRepoList(
  url: string,
): Promise<SearchRepositoriesResponse> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch repositories');
  return res.json();
}
