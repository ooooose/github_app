'use client'

import { useRouter } from 'next/navigation'
import { RepoList } from '@/features/github/components/repo-list'
import { SearchForm } from '@/features/github/components/search-form'

type Props = {
  initialKeyword: string
}

export const SearchBox = ({ initialKeyword }: Props) => {
  const router = useRouter()

  const handleSearch = (q: string) => {
    const keyword = q.trim()
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
      <div className="mt-6">
        <RepoList keyword={initialKeyword} />
      </div>
    </div>
  )
}
