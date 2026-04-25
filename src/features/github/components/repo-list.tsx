'use client'

import { useEffect, useRef } from 'react'
import { RepoItem } from '@/features/github/components/repo-item'
import { useRepoList } from '@/features/github/hooks/use-repo-list'

type Props = {
  keyword: string
}

export const RepoList = ({ keyword }: Props) => {
  const { repos, setSize, isValidating } = useRepoList(keyword)
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = observerRef.current
    if (!element) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSize((prev) => prev + 1)
      }
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [setSize])

  return (
    <div className="space-y-3">
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}

      <div ref={observerRef} className="h-10" />

      {isValidating && (
        <p className="text-sm text-muted-foreground">Loading...</p>
      )}
    </div>
  )
}
