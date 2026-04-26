import { SearchBox } from '@/features/github/components/search-box'
import { Container } from '@/components/container'
import { sanitizeKeyword } from '@/lib/sanitize-keyword'

type Props = {
  searchParams: Promise<{ q?: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams
  const rawKeyword = (Array.isArray(q) ? q[0] : q) ?? ''
  const keyword = sanitizeKeyword(rawKeyword)

  return (
    <main className="min-h-screen bg-background">
      <Container className="py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">GitHubリポジトリ検索</h1>
          <p className="text-sm text-muted-foreground mt-2">
            GitHubのAPIを使用してリポジトリを検索
          </p>
        </header>
        <SearchBox initialKeyword={keyword} />
      </Container>
    </main>
  )
}
