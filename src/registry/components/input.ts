export const input = `import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'w-full h-10 px-4 bg-accent border border-input rounded-[10px]',
    'text-foreground placeholder:text-muted-foreground text-sm',
    'focus:outline-none transition-colors',
    'disabled:opacity-50 disabled:cursor-default'
  ),
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(styles.base, className)} {...props} />
  )
)

Input.displayName = 'Input'
`
