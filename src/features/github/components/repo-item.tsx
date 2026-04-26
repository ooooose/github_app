'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Star, GitFork } from 'lucide-react'
import type { Repository } from '@/features/github/types/github'
import { formatCount } from '@/lib/format-count'

type Props = {
  repo: Repository
}

export const RepoItem = ({ repo }: Props) => {
  const router = useRouter()
  const href = `/repo/${repo.owner.login}/${repo.name}`
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => clearTimer, [])

  // NOTE: 300msホバーしたらprefetchする。
  const schedulePrefetch = () => {
    clearTimer()
    timerRef.current = setTimeout(() => {
      router.prefetch(href)
    }, 300)
  }

  return (
    <Link
      href={href}
      prefetch={false}
      className="flex w-full min-w-0 gap-4 rounded-md border border-border bg-card p-4 shadow-sm hover:bg-accent transition-colors"
      onMouseEnter={schedulePrefetch}
      onMouseLeave={clearTimer}
      onFocus={schedulePrefetch}
      onBlur={clearTimer}
    >
      <Image
        src={repo.owner.avatar_url}
        width={40}
        height={40}
        className="rounded-full self-start"
        alt={`${repo.owner.login}のアバター`}
      />
      <div className="flex-1 min-w-0">
        <p className="text-link font-semibold truncate hover:underline">
          {repo.full_name}
        </p>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {repo.description ?? 'No description'}
        </p>
        <div className="flex gap-4 text-xs text-muted-foreground mt-2">
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
  )
}
