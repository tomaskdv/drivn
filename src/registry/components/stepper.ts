export const stepper = `'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  root: {
    horizontal: 'flex items-center w-full',
    vertical: 'flex flex-col items-center',
    noLine: 'justify-between',
  },
  indicator: {
    base: cn(
      'flex items-center justify-center shrink-0',
      'h-8 min-w-8 rounded-full text-xs font-semibold',
      'transition-colors duration-200 select-none',
      '[&>svg]:size-4'
    ),
    text: 'px-3 shrink',
    active: cn(
      'bg-accent text-muted-foreground',
      'border-2 border-primary'
    ),
    completed: 'bg-primary text-muted-foreground',
    upcoming: cn(
      'bg-accent text-muted-foreground',
      'border-2 border-border'
    ),
    clickable: 'cursor-pointer',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  line: {
    horizontal: 'h-0.5 flex-1',
    vertical: 'w-0.5 min-h-6 self-center',
    active: 'bg-primary',
    upcoming: 'bg-border',
  },
}

type IconProp = React.ComponentType<{ className?: string }>

interface StepperCtx {
  step: number
  orientation: 'horizontal' | 'vertical'
  onStepChange?: (step: number) => void
}

function StepperRoot({
  step = 0,
  onStepChange,
  orientation = 'horizontal',
  line = true,
  className,
  children,
}: {
  step?: number
  onStepChange?: (step: number) => void
  orientation?: 'horizontal' | 'vertical'
  line?: boolean
  className?: string
  children: React.ReactNode
}) {
  const items = React.Children.toArray(children)
  return (
    <Ctx.Provider value={{ step, orientation, onStepChange }}>
      <div
        role="group"
        aria-label="Progress"
        className={cn(
          styles.root[orientation],
          !line && styles.root.noLine,
          className
        )}
      >
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {React.isValidElement(child) &&
              React.cloneElement(
                child as React.ReactElement<{ _index?: number }>,
                { _index: i }
              )}
            {line && i < items.length - 1 && (
              <div
                className={cn(
                  styles.line[orientation],
                  i < step ? styles.line.active : styles.line.upcoming
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </Ctx.Provider>
  )
}

function Item({
  _index = 0,
  label,
  icon: Icon,
  disabled,
  className,
  ...props
}: {
  _index?: number
  label?: string
  icon?: IconProp
  disabled?: boolean
  className?: string
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
>) {
  const { step, onStepChange } = useStepper()
  const state = _index < step ? 'completed' : _index === step ? 'active' : 'upcoming'
  return (
    <button
      type="button"
      disabled={disabled}
      aria-current={state === 'active' ? 'step' : undefined}
      className={cn(
        styles.indicator.base,
        label && styles.indicator.text,
        styles.indicator[state],
        disabled
          ? styles.indicator.disabled
          : styles.indicator.clickable,
        className
      )}
      onClick={() => !disabled && onStepChange?.(_index)}
      {...props}
    >
      {label ?? (state === 'completed' ? <Check /> : Icon ? <Icon /> : _index + 1)}
    </button>
  )
}

const Ctx = React.createContext<StepperCtx | null>(null)

function useStepper() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Stepper.* used outside <Stepper>')
  return ctx
}

export const Stepper = Object.assign(StepperRoot, {
  Item
})
`