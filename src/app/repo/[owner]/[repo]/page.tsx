import { Suspense } from 'react';
import { RepoDetailContainer } from '@/features/github/components/repo-detail-container';
import { RepoDetailSkeleton } from '@/features/github/components/repo-detail-skeleton';

type PageProps = {
  params: Promise<{ owner: string; repo: string }>;
};

export default async function Page({ params }: PageProps) {
  const { owner, repo } = await params;

  return (
    <Suspense fallback={<RepoDetailSkeleton />}>
      <RepoDetailContainer owner={owner} repo={repo} />
    </Suspense>
  );
}
