export const scrollArea = `import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'relative [scrollbar-width:thin]',
    '[scrollbar-color:var(--border)_transparent]',
    '[&::-webkit-scrollbar]:w-1.5',
    '[&::-webkit-scrollbar]:h-1.5',
    '[&::-webkit-scrollbar-track]:bg-transparent',
    '[&::-webkit-scrollbar-track]:rounded-full',
    '[&::-webkit-scrollbar-thumb]:rounded-full',
    '[&::-webkit-scrollbar-thumb]:bg-border',
    '[&:hover::-webkit-scrollbar-thumb]:bg-muted-foreground/30',
    '[&::-webkit-scrollbar-corner]:bg-transparent'
  ),
  orientations: {
    vertical: 'overflow-y-auto overflow-x-hidden',
    horizontal: 'overflow-x-auto overflow-y-hidden',
  },
}

interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
}

export function ScrollArea({
  orientation = 'vertical',
  className,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      className={cn(
        styles.base,
        styles.orientations[orientation],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
`