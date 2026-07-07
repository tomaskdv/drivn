export const badge = `import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'inline-flex items-center gap-1.5 px-2.5 py-0.5',
    'text-xs font-semibold rounded-full'
  ),
  variants: {
    default: 'bg-primary/15 text-primary border border-primary/20',
    secondary: 'bg-secondary/15 text-secondary border border-secondary/30',
    success: 'bg-success/15 text-success border border-success/20',
    outline: 'border border-border text-muted-foreground',
    destructive: 'bg-destructive/15 text-destructive border border-destructive/20',
  },
}

interface BadgeProps {
  variant?: keyof typeof styles.variants
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span className={cn(styles.base, styles.variants[variant], className)}>
      {children}
    </span>
  )
}
`
