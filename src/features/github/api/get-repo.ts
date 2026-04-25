import type { Repository } from '@/features/github/types/github'
import { BASE_URL } from '@/constants/api'

export const getRepo = async (
  owner: string,
  name: string,
): Promise<Repository> => {
  const res = await fetch(`${BASE_URL}/api/github/${owner}/${name}`)

  if (!res.ok) {
    throw new Error('Failed to fetch repository')
  }

  return res.json()
}
