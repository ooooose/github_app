import { getRepo } from '@/features/github/api/get-repo'
import { RepoDetail } from '@/features/github/components/repo-detail'

type Props = {
  owner: string
  repo: string
}

// RepoDetailに一元化するか迷ったが、RepoDetailは純粋なUIコンポーネントでRepoDetailContainerでデータ取得と責務を分けることにした
export const RepoDetailContainer = async ({ owner, repo }: Props) => {
  const data = await getRepo(owner, repo)
  return <RepoDetail repo={data} />
}
