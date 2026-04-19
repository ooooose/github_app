import { SearchBox } from '@/components/search-box';

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            GitHubリポジトリ検索
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            GitHubのAPIを使用してリポジトリを検索
          </p>
        </header>
        <SearchBox />
      </div>
    </main>
  );
}
