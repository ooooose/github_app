import * as React from 'react'

import { cn } from '@/lib/utils'

type Props = React.ComponentProps<'div'> & {
  size?: 'md' | 'lg'
}

const sizeClassName: Record<NonNullable<Props['size']>, string> = {
  md: 'max-w-4xl',
  lg: 'max-w-7xl',
}

export function Container({ className, size = 'md', ...props }: Props) {
  return (
    <div
      data-slot="container"
      className={cn('mx-auto w-full px-6', sizeClassName[size], className)}
      {...props}
    />
  )
}
