import Image from 'next/image';
import { Star, Eye, GitFork, CircleDot } from 'lucide-react';
import type { Repository } from '@/features/github/types/github';
import { formatCount } from '@/lib/format-count';

type Props = {
  repo: Repository;
};

const stats = (repo: Repository) => [
  { icon: Star, label: 'Stars', value: repo.stargazers_count },
  { icon: Eye, label: 'Watchers', value: repo.watchers_count },
  { icon: GitFork, label: 'Forks', value: repo.forks_count },
  { icon: CircleDot, label: 'Issues', value: repo.open_issues_count },
];

export function RepoDetail({ repo }: Props) {
  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm mt-6">
      <div className="flex items-center gap-4">
        <Image
          src={repo.owner.avatar_url}
          width={48}
          height={48}
          className="rounded-full"
          alt={`${repo.owner.login}のアバター`}
        />
        <div>
          <h1 className="text-xl font-bold">{repo.full_name}</h1>
          {repo.language && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {repo.language}
            </span>
          )}
        </div>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300">
        {repo.description ?? 'No description'}
      </p>

      <div className="flex flex-wrap gap-6 mt-6">
        {stats(repo).map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
          >
            <Icon size={16} aria-hidden="true" />
            <span className="sr-only">{label}:</span>
            <span>{formatCount(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
