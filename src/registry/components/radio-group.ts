export const radioGroup = `'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  group: 'flex flex-col gap-3',
  horizontal: 'flex-row gap-4',
  item: 'flex items-start gap-2 cursor-pointer',
  radio: cn(
    'aspect-square w-4 mt-[3px] border border-input shadow-xs',
    'transition-[color,box-shadow] flex-shrink-0',
    'flex items-center justify-center',
    'peer-focus-visible:ring-[3px]',
    'peer-focus-visible:ring-ring/50',
    'peer-focus-visible:border-ring'
  ),
  checked: 'bg-foreground border-foreground',
  indicator: 'w-2 h-2 bg-background',
  label: 'text-sm font-medium text-foreground select-none',
  description: 'text-sm text-muted-foreground select-none',
  variants: {
    circle: 'rounded-full',
    square: 'rounded-[4px]',
  },
  indicators: {
    circle: 'rounded-full',
    square: 'rounded-[2px]',
  },
}

interface RadioGroupCtx {
  value: string
  onSelect: (v: string) => void
  disabled?: boolean
  variant: 'circle' | 'square'
}

function RadioGroupRoot({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = 'vertical',
  variant = 'circle',
  disabled,
  className,
}: {
  children: React.ReactNode
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  orientation?: 'vertical' | 'horizontal'
  variant?: 'circle' | 'square'
  disabled?: boolean
  className?: string
}) {
  const [internal, setInternal] = React.useState(
    defaultValue ?? ''
  )
  const isControlled = controlledValue !== undefined
  const current = isControlled ? controlledValue : internal

  const onSelect = (v: string) => {
    if (!isControlled) setInternal(v)
    onValueChange?.(v)
  }

  return (
    <Ctx.Provider value={{ value: current, onSelect, disabled, variant }}>
      <div
        role="radiogroup"
        className={cn(
          styles.group,
          orientation === 'horizontal' && styles.horizontal,
          className
        )}
      >
        {children}
      </div>
    </Ctx.Provider>
  )
}

const Item = React.forwardRef<
  HTMLInputElement,
  {
    value: string
    label?: string
    description?: string
    children?: React.ReactNode
    disabled?: boolean
    className?: string
  } & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value'
  >
>(({ value, label, description, children, disabled, className, ...props }, ref) => {
  const ctx = useRadioGroup()
  const isDisabled = disabled ?? ctx.disabled
  const isChecked = ctx.value === value

  return (
    <label
      className={cn(
        styles.item,
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <input
        ref={ref}
        type="radio"
        className="peer sr-only"
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => {
          if (!isDisabled) ctx.onSelect(value)
        }}
        {...props}
      />
      <span className={cn(styles.radio, styles.variants[ctx.variant], isChecked && styles.checked)}>
        {isChecked && <span className={cn(styles.indicator, styles.indicators[ctx.variant])} />}
      </span>
      {children ?? (label && (
        <div className="flex flex-col gap-0.5">
          <span className={styles.label}>{label}</span>
          {description && (
            <span className={styles.description}>
              {description}
            </span>
          )}
        </div>
      ))}
    </label>
  )
})

Item.displayName = 'RadioGroup.Item'

const Ctx = React.createContext<RadioGroupCtx | null>(null)

function useRadioGroup() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('RadioGroup compound used outside <RadioGroup>')
  return ctx
}

export const RadioGroup = Object.assign(RadioGroupRoot, { Item })
`
