import Image from 'next/image';
import Link from 'next/link';
import { Star, GitFork } from 'lucide-react';
import type { Repository } from '@/features/github/types/github';
import { formatCount } from '@/lib/format-count';

type Props = {
  repo: Repository;
};

export function RepoItem({ repo }: Props) {
  return (
    <Link
      href={`/repo/${repo.owner.login}/${repo.name}`}
      className="flex gap-4 py-4 border-b border-gray-200"
    >
      <Image
        src={repo.owner.avatar_url}
        width={40}
        height={40}
        className="rounded-full self-start"
        alt={`${repo.owner.login}のアバター`}
      />
      <div className="flex-1 min-w-0">
        <p className="text-blue-600 font-semibold truncate">{repo.full_name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
          {repo.description ?? 'No description'}
        </p>
        <div className="flex gap-4 text-xs text-gray-500 mt-2">
          <span className="flex items-center gap-1">
            <Star size={12} aria-hidden="true" />
            <span className="sr-only">Stars:</span>
            {formatCount(repo.stargazers_count)}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={12} aria-hidden="true" />
            <span className="sr-only">Forks:</span>
            {formatCount(repo.forks_count)}
          </span>
          {repo.language && <span>{repo.language}</span>}
        </div>
      </div>
    </Link>
  );
}
