'use client'

import { useEffect, useRef } from 'react'
import { RepoItem } from '@/features/github/components/repo-item'
import { useRepoList } from '@/features/github/hooks/use-repo-list'

type Props = {
  keyword: string
}

export const RepoList = ({ keyword }: Props) => {
  const { repos, totalCount, setSize, isValidating } = useRepoList(keyword)
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = observerRef.current
    if (!element) return

    // NOTE: IntersectionObserverを使って、最後の要素が画面に入ったら次のページを読み込む。
    // docs: https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSize((prev) => prev + 1)
      }
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [setSize])

  const shouldShowTotalCount = keyword.trim().length > 0 && totalCount !== null

  return (
    <div className="space-y-3">
      {shouldShowTotalCount && (
        <p className="text-sm text-muted-foreground">
          検索結果: {totalCount.toLocaleString()}件
        </p>
      )}

      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}

      <div ref={observerRef} className="h-10" />

      {shouldShowTotalCount && totalCount === 0 && !isValidating && (
        <p className="text-sm text-muted-foreground">
          該当するリポジトリがありません
        </p>
      )}

      {isValidating && (
        <p className="text-sm text-muted-foreground">Loading...</p>
      )}
    </div>
  )
}
