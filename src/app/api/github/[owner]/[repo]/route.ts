import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: { owner: string; repo: string } },
) {
  const { owner, repo } = params;

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: 'GitHub API error' },
      { status: res.status },
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
