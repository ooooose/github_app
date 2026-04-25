import useSWR from 'swr'
import { getRepo } from '@/features/github/api/get-repo'
import type { Repository } from '@/features/github/types/github'

export function useRepo(owner: string, name: string) {
  const { data, isLoading, error } = useSWR<Repository>(
    owner && name ? `repo/${owner}/${name}` : null,
    () => getRepo(owner, name),
  )

  return { repo: data, isLoading, error }
}
