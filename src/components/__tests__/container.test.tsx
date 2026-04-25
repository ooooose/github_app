import { render } from '@testing-library/react'
import { Container } from '../container'

describe('Container', () => {
  it('デフォルトでmax-w-4xlが適用される', () => {
    const { container } = render(<Container />)
    expect(container.firstChild).toHaveClass('max-w-4xl')
  })

  it('size=lgでmax-w-7xlが適用される', () => {
    const { container } = render(<Container size="lg" />)
    expect(container.firstChild).toHaveClass('max-w-7xl')
  })

  it('classNameが追加される', () => {
    const { container } = render(<Container className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
