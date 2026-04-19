'use client';

import { useState } from 'react';
import { RepoList } from './repo-list';

export function SearchBox() {
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    setKeyword(input);
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search repositories..."
          className="flex-1 border p-2 rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          Search
        </button>
      </div>

      <div className="mt-6">
        <RepoList keyword={keyword} />
      </div>
    </div>
  );
}
