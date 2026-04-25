'use client'

import Link from 'next/link'
import { AlertTriangle, Home } from 'lucide-react'

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-24 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <AlertTriangle className="w-16 h-16 text-amber-500" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">500</h1>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          サーバーエラーが発生しました
        </h2>

        <p className="text-gray-600 mb-8">
          申し訳ございません。予期せぬエラーが発生しました。
          <br />
          ページをリロードするか、後ほどお試しください。
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            再試行する
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-md text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            ホームへ戻る
          </Link>
        </div>

        <p className="text-sm text-gray-500 pt-4">{error?.message}</p>
      </div>
    </div>
  )
}
