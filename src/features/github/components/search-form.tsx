'use client'

import { useState } from 'react'

export function SearchForm({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState('')

  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search repositories..."
        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <button
        onClick={() => onSearch(value)}
        className="mt-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-md"
      >
        Search
      </button>
    </div>
  )
}
