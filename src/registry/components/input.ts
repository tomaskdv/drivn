export const input = `import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'w-full h-10 px-4 border border-input rounded-[10px]',
    'text-foreground placeholder:text-muted-foreground text-sm',
    'focus:outline-none transition-[color,box-shadow]',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
    'disabled:opacity-50 disabled:cursor-default'
  ),
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className,
  ...props
}, ref) => (
    <input ref={ref} className={cn(styles.base, className)} {...props} />
  )
)

Input.displayName = 'Input'
`
