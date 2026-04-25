import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="bg-[#24292f] text-white border-b border-black/20 dark:bg-[#161b22] dark:border-border">
      <div className="max-w-4xl mx-auto px-6 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image src="/github.png" alt="GitHub Logo" width={28} height={28} />
          <span className="text-lg font-semibold">GitRepos</span>
        </Link>
      </div>
    </header>
  )
}
