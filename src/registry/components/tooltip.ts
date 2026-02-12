export const tooltip = `import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: 'relative inline-flex group',
  tip: cn(
    'absolute z-50 px-2.5 py-1.5 text-xs font-medium',
    'rounded-lg bg-foreground text-background',
    'whitespace-nowrap pointer-events-none',
    'opacity-0 group-hover:opacity-100 transition-opacity'
  ),
  positions: {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  },
}

interface TooltipProps {
  content: string
  position?: keyof typeof styles.positions
  className?: string
  children: React.ReactNode
}

export function Tooltip({
  content,
  position = 'top',
  className,
  children,
}: TooltipProps) {
  return (
    <span className={cn(styles.base, className)}>
      {children}
      <span className={cn(styles.tip, styles.positions[position])}>
        {content}
      </span>
    </span>
  )
}
`
