import Link from 'next/link'
import Image from 'next/image'

import { Container } from '@/components/container'

export function Header() {
  return (
    <header className="bg-header text-header-foreground border-b border-header-border">
      <Container className="py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/github.png"
            alt="GitHub Logo"
            width={28}
            height={28}
            className="block"
            priority
          />
          <span className="text-lg font-semibold">GitRepos</span>
        </Link>
      </Container>
    </header>
  )
}
