import Image from 'next/image';
import Link from 'next/link';
import type { Repository } from '@/features/github/types/github';

type Props = {
  repo: Repository;
};

export function RepoItem({ repo }: Props) {
  return (
    <Link href={`/repo/${repo.owner.login}/${repo.name}`}>
      <div className="py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer flex gap-4">
        <div>
          <Image
            src={repo.owner.avatar_url}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
            alt={`${repo.owner.login} avatar`}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-blue-600 font-semibold">{repo.full_name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {repo.description ?? 'No description'}
          </p>
          <div className="flex gap-4 text-xs text-gray-500 mt-2">
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
            <span>{repo.language ?? 'Unknown'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
