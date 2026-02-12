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
  openItem: string | null
  toggle: (value: string) => void
}

const Ctx = React.createContext<AccordionCtx | null>(null)
const ItemCtx = React.createContext<string | null>(null)

function useAccordion() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Accordion compound used outside <Accordion>')
  return ctx
}

function useItemValue() {
  const value = React.useContext(ItemCtx)
  if (!value) throw new Error(
    'Accordion sub-component used outside <Accordion.Item>'
  )
  return value
}

function AccordionRoot({
  children,
  defaultValue,
  className,
}: {
  children: React.ReactNode
  defaultValue?: string
  className?: string
}) {
  const [openItem, setOpenItem] = React.useState<string | null>(
    defaultValue ?? null
  )
  const toggle = React.useCallback(
    (value: string) =>
      setOpenItem((prev) => (prev === value ? null : value)),
    []
  )

  return (
    <Ctx.Provider value={{ openItem, toggle }}>
      <div className={cn(styles.base, className)}>
        {children}
      </div>
    </Ctx.Provider>
  )
}

function Item({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <ItemCtx.Provider value={value}>
      <div className={className}>{children}</div>
    </ItemCtx.Provider>
  )
}

function Trigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { openItem, toggle } = useAccordion()
  const value = useItemValue()
  const isOpen = openItem === value
  return (
    <button
      className={cn(styles.trigger, className)}
      onClick={() => toggle(value)}
    >
      {children}
      <ChevronDown className={cn(styles.icon, isOpen && 'rotate-180')} />
    </button>
  )
}

function Content({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { openItem } = useAccordion()
  const value = useItemValue()
  const isOpen = openItem === value
  return (
    <div
      className={styles.panel}
      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
    >
      <div className={cn(styles.content, className)}>
        <div className="pb-4">{children}</div>
      </div>
    </div>
  )
}

export const Accordion = Object.assign(AccordionRoot, {
  Item,
  Trigger,
  Content,
})
`
