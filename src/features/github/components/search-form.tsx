'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SearchForm({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState('')

  return (
    <div className="border-b border-border pb-4 mb-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search repositories..."
      />
      <Button
        onClick={() => onSearch(value)}
        variant="primary"
        className="mt-2"
      >
        Search
      </Button>
    </div>
  )
}
