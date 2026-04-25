'use client'

import { useState } from 'react'
import { RepoList } from '@/features/github/components/repo-list'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SearchBox() {
  const [input, setInput] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setKeyword(input)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          id="search-input"
          name="search"
          placeholder="リポジトリを検索..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="primary" disabled={!input.trim()}>
          検索
        </Button>
      </form>

      <div className="mt-6">
        <RepoList keyword={keyword} />
      </div>
    </div>
  )
}
