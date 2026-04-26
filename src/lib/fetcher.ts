// NOTE: APIリクエストを行うfetcher関数を定義。SWRのデータフェッチングライブラリで使用することを想定。
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch')
  }

  return res.json()
}
