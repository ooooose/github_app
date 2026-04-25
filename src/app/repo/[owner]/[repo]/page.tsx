import { getRepo } from '@/features/github/api/github';
import { RepoDetail } from '@/features/github/components/repo-detail';

type PageProps = {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { owner, repo: repoName } = await params;
  const repo = await getRepo(owner, repoName);

  return <RepoDetail repo={repo} />;
}
