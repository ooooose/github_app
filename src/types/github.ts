export type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
};

export type SearchRepositoriesResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
};

export type RepoItem = {
  id: number;
  name: string;
  owner: string;
  avatarUrl: string;
  description: string | null;
  stars: number;
  watchers: number;
  forks: number;
  issues: number;
  language: string | null;
};

export function mapRepo(repo: Repository): RepoItem {
  return {
    id: repo.id,
    name: repo.full_name,
    owner: repo.owner.login,
    avatarUrl: repo.owner.avatar_url,
    description: repo.description,
    stars: repo.stargazers_count,
    watchers: repo.watchers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
    language: repo.language,
  };
}
