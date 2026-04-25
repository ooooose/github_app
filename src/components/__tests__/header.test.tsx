import { render, screen } from '@testing-library/react'
import { Header } from '@/components/header'

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string
    children: React.ReactNode
    className?: string
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string
    alt: string
    width: number
    height: number
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} />
  ),
}))

describe('Header', () => {
  it('ヘッダーが描画される', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('ホームへのリンクが存在する', () => {
    render(<Header />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })

  it('GitHubロゴ画像が表示される', () => {
    render(<Header />)
    const img = screen.getByAltText('GitHub Logo')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/github.png')
  })

  it('サービス名が表示される', () => {
    render(<Header />)
    expect(screen.getByText('GitRepos')).toBeInTheDocument()
  })
})
