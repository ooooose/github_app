import type { SearchRepositoriesResponse, Repository } from '@/types/github';

type Params = {
  query: string;
  page?: number;
};

export async function searchRepos({
  query,
  page = 1,
}: Params): Promise<SearchRepositoriesResponse> {
  const res = await fetch(
    `/api/github?q=${encodeURIComponent(query)}&page=${page}`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch repositories');
  }

  return res.json();
}

export async function getRepo(
  owner: string,
  name: string,
): Promise<Repository> {
  const res = await fetch(`api/github/${owner}/${name}`);

  if (!res.ok) {
    throw new Error('Failed to fetch repository');
  }

  return res.json();
}
