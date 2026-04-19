import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const q = searchParams.get('q');
  const page = searchParams.get('page') ?? '1';

  if (!q) {
    return NextResponse.json({ message: 'Query is required' }, { status: 400 });
  }

  const res = await fetch(
    `https://api.github.com/search/repositories?q=${q}&page=${page}&per_page=20`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: 'GitHub API error' },
      { status: res.status },
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
