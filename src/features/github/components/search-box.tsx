'use client'

import { useRouter } from 'next/navigation'
import { RepoList } from '@/features/github/components/repo-list'
import { SearchForm } from '@/features/github/components/search-form'
import { sanitizeKeyword } from '@/lib/sanitize-keyword'

type Props = {
  initialKeyword: string
}

export const SearchBox = ({ initialKeyword }: Props) => {
  const router = useRouter()

  const handleSearch = (q: string) => {
    const keyword = sanitizeKeyword(q.trim())
    if (!keyword) {
      router.push('/')
      return
    }
    router.push(`/?q=${encodeURIComponent(keyword)}`)
  }

  return (
    <div>
      <SearchForm
        key={initialKeyword}
        defaultValue={initialKeyword}
        onSearch={handleSearch}
      />
      <p className="mt-2 text-xs text-muted-foreground">
        ※キーワードは1つだけ指定できます（空白は自動で除去されます）
      </p>
      <div className="mt-6">
        <RepoList keyword={initialKeyword} />
      </div>
    </div>
  )
}
