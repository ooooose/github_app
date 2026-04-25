import { SearchBox } from '@/features/github/components/search-box'
import { Container } from '@/components/container'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Container className="py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">GitHubリポジトリ検索</h1>
          <p className="text-sm text-muted-foreground mt-2">
            GitHubのAPIを使用してリポジトリを検索
          </p>
        </header>
        <SearchBox />
      </Container>
    </main>
  )
}
