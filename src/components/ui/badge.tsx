import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-medium whitespace-nowrap text-foreground transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        default: 'bg-muted text-foreground [a]:hover:bg-accent',
        primary:
          'bg-primary text-primary-foreground border-primary/80 [a]:hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-accent',
        destructive:
          'bg-destructive text-white border-destructive/80 focus-visible:ring-destructive/30 [a]:hover:bg-destructive/90',
        outline: 'bg-transparent text-foreground [a]:hover:bg-accent',
        ghost:
          'bg-transparent border-transparent hover:bg-accent hover:text-accent-foreground',
        link: 'bg-transparent border-transparent text-link underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Badge = ({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot.Root : 'span'

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
