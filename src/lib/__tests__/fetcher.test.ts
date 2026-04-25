import { fetcher } from '@/lib/fetcher'

describe('fetcher', () => {
  it('正常なレスポンスの場合はJSONを返す', async () => {
    const mockData = { id: 1, name: 'test' }
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const result = await fetcher('/api/test')
    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith('/api/test')
  })

  it('レスポンスがokでない場合はエラーをthrowする', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    })

    await expect(fetcher('/api/test')).rejects.toThrow('Failed to fetch')
  })

  it('fetchが失敗した場合はエラーをthrowする', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    await expect(fetcher('/api/test')).rejects.toThrow('Network error')
  })
})
