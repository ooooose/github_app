import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Header } from '@/components/header'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'GitRepos',
  description: 'GitHubリポジトリ検索アプリ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      className={cn(
        'bg-white',
        'text-gray-900',
        inter.className,
        'font-sans',
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        {children}
      </body>
    </html>
  )
}
