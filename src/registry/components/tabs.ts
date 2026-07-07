export const tabs = `'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

const variantStyles = {
  default: {
    list: 'flex w-fit bg-accent border border-border rounded-[10px] p-1',
    tab: cn(
      'px-4 py-2 text-sm font-medium rounded-lg',
      'transition-colors cursor-pointer'
    ),
    active: 'bg-background text-foreground',
    inactive: 'text-muted-foreground hover:text-foreground',
  },
  underline: {
    list: 'flex w-fit gap-4',
    tab: cn(
      'text-[16px] font-medium',
      'transition-colors cursor-pointer'
    ),
    active: 'text-foreground underline underline-offset-8',
    inactive: 'text-muted-foreground hover:text-foreground',
  },
  compact: {
    list: 'flex w-fit gap-0.5',
    tab: cn(
      'px-2.5 py-1 text-xs font-semibold rounded',
      'transition-colors cursor-pointer'
    ),
    active: 'bg-muted text-foreground',
    inactive: 'text-muted-foreground hover:text-foreground hover:bg-muted',
  },
}

type TabsVariant = keyof typeof variantStyles

interface TabsCtx {
  value: string
  setValue: (v: string) => void
  variant: TabsVariant
}

function TabsRoot({
  children,
  defaultValue,
  value: controlled,
  onChange,
  variant = 'default',
  className,
}: {
  children: React.ReactNode
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  variant?: TabsVariant
  className?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? '')
  const value = controlled ?? uncontrolled
  const setValue = React.useCallback(
    (v: string) => {
      onChange?.(v)
      if (controlled === undefined) setUncontrolled(v)
    },
    [controlled, onChange]
  )

  return (
    <Ctx.Provider value={{ value, setValue, variant }}>
      <div className={className}>{children}</div>
    </Ctx.Provider>
  )
}

function List({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { variant } = useTabs()
  const styles = variantStyles[variant]
  return (
    <div className={cn(styles.list, className)}>
      {children}
    </div>
  )
}

function Tab({
  value: tabValue,
  children,
  className,
  ...props
}: {
  value: string
  children: React.ReactNode
  className?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  const { value, setValue, variant } = useTabs()
  const styles = variantStyles[variant]
  const isActive = value === tabValue
  return (
    <button
      className={cn(styles.tab, isActive ? styles.active : styles.inactive, 'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50', className)}
      onClick={() => setValue(tabValue)}
      {...props}
    >
      {children}
    </button>
  )
}

function Panel({
  value: panelValue,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const { value } = useTabs()
  if (value !== panelValue) return null
  return <div className={className}>{children}</div>
}

const Ctx = React.createContext<TabsCtx | null>(null)

function useTabs() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Tabs compound used outside <Tabs>')
  return ctx
}

export const Tabs = Object.assign(TabsRoot, {
  List,
  Tab,
  Panel
})
`
