export const accordion = `'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react'
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

const Ctx = createContext<AccordionCtx | null>(null)

function useAccordion() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('Accordion compound used outside <Accordion>')
  return ctx
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
  const [openItem, setOpenItem] = useState<string | null>(
    defaultValue ?? null
  )
  const toggle = useCallback(
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
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

function Trigger({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const { openItem, toggle } = useAccordion()
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
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const { openItem } = useAccordion()
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
