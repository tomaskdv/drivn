export const collapsible = `'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  panel: 'grid transition-[grid-template-rows] duration-200',
  content: 'overflow-hidden',
}

interface CollapsibleCtx {
  open: boolean
  toggle: () => void
  triggerId: string
  contentId: string
}

function CollapsibleRoot({
  children,
  className,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode
  className?: string
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = controlledOpen ?? internalOpen
  const id = React.useId()
  const triggerId = \`\${id}trigger\`
  const contentId = \`\${id}content\`

  const toggle = () => {
    const next = !open
    if (controlledOpen === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <Ctx.Provider value={{ open, toggle, triggerId, contentId }}>
      <div
        className={className}
        data-state={open ? 'open' : 'closed'}
      >
        {children}
      </div>
    </Ctx.Provider>
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
  const { open, toggle, triggerId, contentId } = useCtx()
  return (
    <button
      id={triggerId}
      aria-expanded={open}
      aria-controls={contentId}
      data-state={open ? 'open' : 'closed'}
      className={className}
      onClick={toggle}
      {...props}
    >
      {children}
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
  const { open, triggerId, contentId } = useCtx()
  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={open ? 'open' : 'closed'}
      className={styles.panel}
      style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
    >
      <div className={cn(styles.content, className)}>
        {children}
      </div>
    </div>
  )
}

const Ctx = React.createContext<CollapsibleCtx | null>(null)

function useCtx() {
  const c = React.useContext(Ctx)
  if (!c) throw new Error('Collapsible compound used outside <Collapsible>')
  return c
}

export const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger,
  Content,
})
`
