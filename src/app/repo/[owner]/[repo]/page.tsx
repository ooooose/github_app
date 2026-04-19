import Image from 'next/image';
import { getRepo } from '@/lib/github';

type PageProps = {
  params: {
    owner: string;
    name: string;
  };
};

export default async function Page({ params }: PageProps) {
  const repo = await getRepo(params.owner, params.name);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4">
        <Image
          src={repo.owner.avatar_url}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
          alt={`${repo.owner.login} avatar`}
        />
        <h1 className="text-xl font-bold">{repo.full_name}</h1>
      </div>

      <p className="mt-4 text-gray-700">
        {repo.description ?? 'No description'}
      </p>

      <div className="flex gap-6 mt-6 text-sm">
        <span>⭐ {repo.stargazers_count}</span>
        <span>👀 {repo.watchers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>🐞 {repo.open_issues_count}</span>
        <span>{repo.language ?? 'Unknown'}</span>
      </div>
    </div>
  );
}
