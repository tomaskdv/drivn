export const accordion = `'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  base: 'w-full divide-y divide-border border-y border-border',
  trigger: cn(
    'flex items-center justify-between w-full py-4',
    'text-sm font-medium text-foreground',
    'hover:text-foreground/80 transition-colors cursor-pointer'
  ),
  icon: cn(
    'w-4 h-4 text-muted-foreground',
    'transition-transform duration-200'
  ),
  panel: 'grid transition-[grid-template-rows] duration-200',
  content: 'overflow-hidden text-sm text-muted-foreground',
}

interface AccordionCtx {
  open: Set<string>
  toggle: (v: string) => void
}

function AccordionRoot({
  children,
  defaultValue,
  multiple,
  className,
  ...props
}: {
  children: React.ReactNode
  defaultValue?: string | string[]
  multiple?: boolean
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = React.useState(
    () => new Set([defaultValue ?? []].flat())
  )

  const toggle = (v: string) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : [])
      prev.has(v) ? next.delete(v) : next.add(v)
      return next
    })

  return (
    <Ctx.Provider value={{ open, toggle }}>
      <div className={cn(styles.base, className)} {...props}>
        {children}
      </div>
    </Ctx.Provider>
  )
}

function Item({
  value,
  children,
  className,
  ...props
}: {
  value: string
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ItemCtx.Provider value={value}>
      <div className={className} {...props}>{children}</div>
    </ItemCtx.Provider>
  )
}

function Trigger({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, toggle } = useCtx()
  const value = React.useContext(ItemCtx)
  const isOpen = open.has(value)
  return (
    <button
      aria-expanded={isOpen}
      className={cn(styles.trigger, className)}
      onClick={() => toggle(value)}
      {...props}
    >
      {children}
      <ChevronDown className={cn(styles.icon, isOpen && 'rotate-180')} />
    </button>
  )
}

function Content({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useCtx()
  const value = React.useContext(ItemCtx)
  const isOpen = open.has(value)
  return (
    <div
      role="region"
      className={styles.panel}
      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      {...props}
    >
      <div className={cn(styles.content, className)}>
        <div className="pb-4">{children}</div>
      </div>
    </div>
  )
}

const Ctx = React.createContext<AccordionCtx | null>(null)
const ItemCtx = React.createContext('')

function useCtx() {
  const c = React.useContext(Ctx)
  if (!c) throw new Error('Accordion compound used outside <Accordion>')
  return c
}

export const Accordion = Object.assign(AccordionRoot, {
  Item, Trigger, Content,
})
`