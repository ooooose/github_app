'use client'

import Link from 'next/link'
import { AlertTriangle, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center pt-24 px-4">
      <Card className="text-center max-w-md w-full p-6">
        <div className="mb-8 flex justify-center">
          <AlertTriangle className="w-16 h-16 text-amber-500" />
        </div>

        <h1 className="text-4xl font-bold mb-4">500</h1>

        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          サーバーエラーが発生しました
        </h2>

        <p className="text-muted-foreground mb-8">
          申し訳ございません。予期せぬエラーが発生しました。
          <br />
          ページをリロードするか、後ほどお試しください。
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="primary" className="h-10 px-6">
            再試行する
          </Button>
          <Button asChild className="h-10 px-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="w-5 h-5" />
              ホームへ戻る
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-4">{error?.message}</p>
      </Card>
    </div>
  )
}
