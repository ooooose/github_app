'use client';

import useSWRInfinite from 'swr/infinite';
import { useEffect, useRef } from 'react';
import { RepoItem } from './repo-item';
import { fetcher } from '@/lib/fetcher';
import type { Repository, SearchRepositoriesResponse } from '@/types/github';

type Props = {
  keyword: string;
};

export function RepoList({ keyword }: Props) {
  const getKey = (
    pageIndex: number,
    prev: SearchRepositoriesResponse | null,
  ): string | null => {
    if (!keyword) return null;
    if (prev && prev.items.length === 0) return null;

    return `/api/github?q=${keyword}&page=${pageIndex + 1}`;
  };

  const { data, setSize, isValidating } =
    useSWRInfinite<SearchRepositoriesResponse>(getKey, fetcher);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSize((prev) => prev + 1); // ←ここ重要
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [setSize]);

  const repos: Repository[] = data ? data.flatMap((page) => page.items) : [];

  return (
    <div>
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}

      <div ref={observerRef} className="h-10" />

      {isValidating && <p className="text-sm text-gray-500">Loading...</p>}
    </div>
  );
}
