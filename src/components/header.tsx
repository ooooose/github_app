import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white text-gray-900 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <span className="text-lg font-semibold">GitRepos</span>
        </Link>
      </div>
    </header>
  );
}
