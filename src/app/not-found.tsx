'use client'

import Link from 'next/link'
import { AlertCircle, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center pt-24 px-4">
      <Card className="text-center max-w-md w-full p-6">
        <div className="mb-8 flex justify-center">
          <AlertCircle className="w-16 h-16 text-destructive" />
        </div>

        <h1 className="text-4xl font-bold mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          ページが見つかりません
        </h2>

        <p className="text-muted-foreground mb-8">
          申し訳ございません。お探しのページは存在しないか、移動された可能性があります。
        </p>

        <div className="space-y-3">
          <Button asChild variant="primary" className="h-10 px-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="w-5 h-5" />
              ホームに戻る
            </Link>
          </Button>

          <p className="text-sm text-muted-foreground pt-4">
            他のページをお探しの場合は、ホームから再度お試しください。
          </p>
        </div>
      </Card>
    </div>
  )
}
