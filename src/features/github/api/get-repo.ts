import type { Repository } from '@/features/github/types/github';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

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
