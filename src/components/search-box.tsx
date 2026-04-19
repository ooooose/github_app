'use client';

import { useState } from 'react';
import { RepoList } from './repo-list';

export function SearchBox() {
  const [keyword, setKeyword] = useState<string>('');

  return (
    <div>
      <input
        type="text"
        placeholder="Search repositories..."
        className="w-full border p-2 rounded-md"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <div className="mt-6">
        <RepoList keyword={keyword} />
      </div>
    </div>
  );
}
