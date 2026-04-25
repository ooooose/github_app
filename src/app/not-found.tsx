'use client'

import Link from 'next/link'
import { AlertCircle, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-24 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <AlertCircle className="w-16 h-16 text-red-500" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          ページが見つかりません
        </h2>

        <p className="text-gray-600 mb-8">
          申し訳ございません。お探しのページは存在しないか、移動された可能性があります。
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <Home className="w-5 h-5" />
            ホームに戻る
          </Link>

          <p className="text-sm text-gray-500 pt-4">
            他のページをお探しの場合は、ホームから再度お試しください。
          </p>
        </div>
      </div>
    </div>
  )
}
