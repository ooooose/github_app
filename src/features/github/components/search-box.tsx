'use client'

import { useState } from 'react'
import { RepoList } from '@/features/github/components/repo-list'
import { SearchForm } from '@/features/github/components/search-form'

export const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  return (
    <div>
      <SearchForm onSearch={(q) => setKeyword(q)} />

      <div className="mt-6">
        <RepoList keyword={keyword} />
      </div>
    </div>
  )
}
