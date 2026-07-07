export const checkbox = `'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  base: 'flex items-center gap-2 cursor-pointer',
  box: cn(
    'w-4 h-4 rounded-[4px] border border-border',
    'transition-[color,box-shadow] flex-shrink-0',
    'flex items-center justify-center',
    'peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50',
    'peer-focus-visible:border-ring'
  ),
  checked: 'bg-primary border-primary',
  label: 'text-sm text-foreground select-none',
}

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  className,
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  ...props
}, ref) => {
    const [internal, setInternal] = React.useState(defaultChecked ?? false)
    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internal

    return (
      <label className={cn(styles.base, disabled && 'opacity-50 cursor-default', className)}>
        <input
          ref={ref}
          type="checkbox"
          className="peer sr-only"
          checked={isChecked}
          disabled={disabled}
          onChange={(e) => {
            if (!isControlled)
              setInternal(e.target.checked)
            onChange?.(e)
          }}
          {...props}
        />
        <span className={cn(styles.box, isChecked && styles.checked)}>
          {isChecked && (
            <Check className="w-2.5 h-2.5 text-primary-foreground" />
          )}
        </span>
        {label && (
          <span className={styles.label}>{label}</span>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
`
