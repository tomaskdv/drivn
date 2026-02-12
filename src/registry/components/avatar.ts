export const avatar = `import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'relative inline-flex items-center justify-center',
    'rounded-full overflow-hidden',
    'bg-gradient-to-br from-primary to-secondary'
  ),
  sizes: {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  },
}

interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: keyof typeof styles.sizes
  className?: string
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className,
}: AvatarProps) {
  return (
    <div className={cn(styles.base, styles.sizes[size], className)}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-primary-foreground">
          {fallback?.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  )
}
`
