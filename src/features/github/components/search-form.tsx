'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  defaultValue?: string
  onSearch: (q: string) => void
}

export const SearchForm = ({ defaultValue = '', onSearch }: Props) => {
  const [value, setValue] = useState(defaultValue)
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
