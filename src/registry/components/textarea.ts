export const textarea = `import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'w-full min-h-[80px] px-4 py-3 bg-accent',
    'border border-input rounded-[10px]',
    'text-foreground placeholder:text-muted-foreground text-sm',
    'focus:outline-none transition-colors',
    'resize-y disabled:opacity-50 disabled:cursor-default'
  ),
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(styles.base, className)}
    {...props}
  />
))

Textarea.displayName = 'Textarea'
`
