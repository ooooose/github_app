import type {
  SearchRepositoriesResponse,
  Repository,
} from '@/features/github/types/github';

type Params = {
  query: string;
  page?: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function searchRepos({
  query,
  page = 1,
}: Params): Promise<SearchRepositoriesResponse> {
  const res = await fetch(
    `${BASE_URL}/api/github?q=${encodeURIComponent(query)}&page=${page}`,
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
  const res = await fetch(`${BASE_URL}/api/github/${owner}/${name}`);

  if (!res.ok) {
    throw new Error('Failed to fetch repository');
  }

  return res.json();
}
