export const kbd = `import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'pointer-events-none inline-flex items-center',
    'justify-center select-none',
    'h-5 w-fit min-w-5 gap-1 rounded-sm px-1',
    'font-mono text-xs font-medium',
    '[&_svg:not([class*=size-])]:size-3'
  ),
  variants: {
    default: 'bg-muted text-muted-foreground',
    outline: 'border border-border text-muted-foreground',
  },
  group: 'inline-flex items-center gap-1',
}

interface KbdProps {
  variant?: keyof typeof styles.variants
  className?: string
  children: React.ReactNode
}

function KbdRoot({
  variant = 'default',
  className,
  children,
}: KbdProps) {
  return (
    <kbd
      className={cn(
        styles.base,
        styles.variants[variant],
        className,
      )}
    >
      {children}
    </kbd>
  )
}

function Group({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <kbd className={cn(styles.group, className)}>
      {children}
    </kbd>
  )
}

export const Kbd = Object.assign(KbdRoot, { Group })
`
