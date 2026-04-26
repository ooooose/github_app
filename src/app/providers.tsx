'use client'

import { SWRConfig } from 'swr'
import { fetcher } from '@/lib/fetcher'

// NOTE: SWRConfigでfetcherやオプションをグローバルに設定するProviderコンポーネント
// docs: https://swr.vercel.app/docs/global-configuration
// 不要なAPIリクエストを減らすため、フォーカス時の再検証やエラー時のリトライは無効にしている。
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  )
}
