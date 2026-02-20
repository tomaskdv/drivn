export const tabs = `'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  list: 'flex w-fit bg-accent border border-border rounded-[10px] p-1',
  tab: cn(
    'px-4 py-2 text-sm font-medium rounded-lg',
    'transition-colors cursor-pointer'
  ),
  active: 'bg-background text-foreground',
  inactive: 'text-muted-foreground hover:text-foreground',
}

interface TabsCtx {
  value: string
  setValue: (v: string) => void
}

function TabsRoot({
  children,
  defaultValue,
  value: controlled,
  onChange,
  className,
}: {
  children: React.ReactNode
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState(
    defaultValue ?? ''
  )
  const value = controlled ?? uncontrolled
  const setValue = React.useCallback(
    (v: string) => {
      onChange?.(v)
      if (controlled === undefined) setUncontrolled(v)
    },
    [controlled, onChange]
  )

  return (
    <Ctx.Provider value={{ value, setValue }}>
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
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const { value, setValue } = useTabs()
  const isActive = value === tabValue
  return (
    <button
      className={cn(
        styles.tab,
        isActive ? styles.active : styles.inactive,
        className
      )}
      onClick={() => setValue(tabValue)}
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
  Panel,
})
`
