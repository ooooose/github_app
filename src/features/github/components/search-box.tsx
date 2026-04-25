'use client'

import { useState } from 'react'
import { RepoList } from '@/features/github/components/repo-list'

export function SearchBox() {
  const [input, setInput] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleSearch = () => {
    setKeyword(input)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          id="search-input"
          name="search"
          placeholder="リポジトリを検索..."
          className="flex-1 border p-2 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          検索
        </button>
      </form>

      <div className="mt-6">
        <RepoList keyword={keyword} />
      </div>
    </div>
  )
}
