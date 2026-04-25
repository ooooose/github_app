import { getRepo } from '@/features/github/api/get-repo'
import { RepoDetail } from '@/features/github/components/repo-detail'

type Props = {
  owner: string
  repo: string
}

export const RepoDetailContainer = async ({ owner, repo }: Props) => {
  const data = await getRepo(owner, repo)
  return <RepoDetail repo={data} />
}
