export const toggle = `'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'inline-flex items-center justify-center gap-2',
    'rounded-md text-sm font-medium',
    'transition-colors cursor-pointer',
    'focus:outline-none',
    'disabled:opacity-50 disabled:cursor-default'
  ),
  variants: {
    default: cn(
      'bg-transparent text-muted-foreground',
      'hover:bg-muted hover:text-foreground',
      'data-[state=on]:bg-muted',
      'data-[state=on]:text-foreground'
    ),
    outline: cn(
      'border border-border bg-transparent',
      'text-muted-foreground',
      'hover:border-foreground/20',
      'data-[state=on]:bg-muted',
      'data-[state=on]:text-foreground',
      'data-[state=on]:border-muted'
    ),
  },
  sizes: {
    sm: 'h-8 px-2.5 text-xs',
    md: 'h-9 px-3 text-sm',
    lg: 'h-10 px-4 text-sm',
  },
  group: 'inline-flex items-center gap-1',
  vertical: 'flex-col',
}

interface ToggleGroupCtx {
  type: 'single' | 'multiple'
  value: string | string[]
  onToggle: (v: string) => void
  disabled?: boolean
}

interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  pressed?: boolean
  defaultPressed?: boolean
  onChange?: (pressed: boolean) => void
  value?: string
  variant?: keyof typeof styles.variants
  size?: keyof typeof styles.sizes
}

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleProps>(({
  pressed,
  defaultPressed,
  onChange,
  value,
  variant = 'default',
  size = 'md',
  disabled,
  className,
  children,
  ...props
}, ref) => {
  const ctx = React.useContext(Ctx)
  const [internal, setInternal] = React.useState(defaultPressed ?? false)
  const inGroup = ctx !== null && value !== undefined

  const isPressed = inGroup
    ? ctx.type === 'multiple'
      ? (ctx.value as string[]).includes(value)
      : ctx.value === value
    : pressed ?? internal

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isPressed}
      data-state={isPressed ? 'on' : 'off'}
      disabled={disabled ?? (inGroup ? ctx.disabled : false)}
      className={cn(styles.base, styles.variants[variant], styles.sizes[size], className)}
      onClick={() => {
        if (inGroup) {
          ctx.onToggle(value)
        } else {
          const next = !isPressed
          if (pressed === undefined) setInternal(next)
          onChange?.(next)
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
})

ToggleButton.displayName = 'Toggle'

function ToggleGroupRoot({
  children,
  type,
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = 'horizontal',
  disabled,
  className,
}: {
  children: React.ReactNode
  type: 'single' | 'multiple'
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  orientation?: 'vertical' | 'horizontal'
  disabled?: boolean
  className?: string
}) {
  const [internal, setInternal] = React.useState<string | string[]>(defaultValue ?? (type === 'multiple' ? [] : ''))
  const isControlled = controlledValue !== undefined
  const current = isControlled ? controlledValue : internal

  const onToggle = (itemValue: string) => {
    let next: string | string[]
    if (type === 'single') {
      next = current === itemValue ? '' : itemValue
    } else {
      const arr = current as string[]
      next = arr.includes(itemValue)
        ? arr.filter((v) => v !== itemValue)
        : [...arr, itemValue]
    }
    if (!isControlled) setInternal(next)
    onValueChange?.(next)
  }

  return (
    <Ctx.Provider
      value={{ type, value: current, onToggle, disabled }}
    >
      <div
        role="group"
        className={cn(
          styles.group,
          orientation === 'vertical' && styles.vertical,
          className
        )}
      >
        {children}
      </div>
    </Ctx.Provider>
  )
}

const Ctx = React.createContext<ToggleGroupCtx | null>(null)

export const Toggle = Object.assign(ToggleButton, {
  Group: ToggleGroupRoot,
})
`