'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SearchForm({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState('')
  const trimmed = value.trim()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        id="search-input"
        name="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="リポジトリを検索..."
      />
      <Button type="submit" variant="primary" disabled={!trimmed}>
        検索
      </Button>
    </form>
  )
}
