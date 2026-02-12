export const checkbox = `import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: 'flex items-center gap-2 cursor-pointer',
  input: 'peer sr-only',
  box: cn(
    'w-3.5 h-3.5 rounded-[4px] border border-border',
    'bg-accent transition-colors flex-shrink-0',
    'flex items-center justify-center',
    'peer-disabled:opacity-50 peer-disabled:cursor-default'
  ),
  check: cn(
    'w-2.5 h-2.5 rounded-[2px] bg-primary',
    'hidden peer-checked:block'
  ),
  label: 'text-sm text-foreground select-none',
}

interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ className, label, ...props }, ref) => (
  <label className={cn(styles.base, className)}>
    <input
      ref={ref}
      type="checkbox"
      className={styles.input}
      {...props}
    />
    <span className={styles.box}>
      <div className={styles.check} />
    </span>
    {label && <span className={styles.label}>{label}</span>}
  </label>
))

Checkbox.displayName = 'Checkbox'
`
