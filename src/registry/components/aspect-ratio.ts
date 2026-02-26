export const aspectRatio = `import * as React from 'react'
import { cn } from '@/utils/cn'

interface AspectRatioProps {
  ratio?: '16/9' | '4/3' | '1/1' | number
  className?: string
  children?: React.ReactNode
}

export function AspectRatio({
  ratio = '16/9',
  className,
  children,
}: AspectRatioProps) {
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  )
}
`
