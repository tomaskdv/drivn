export const dropdown = `'use client'

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: 'relative inline-flex',
  menu: cn(
    'absolute top-full mt-1 min-w-[180px] z-50',
    'bg-card border border-border rounded-[10px] p-1',
    'shadow-lg'
  ),
  item: cn(
    'flex items-center gap-2 w-full px-3 py-2',
    'text-sm text-foreground rounded-lg',
    'hover:bg-accent transition-colors cursor-pointer'
  ),
  destructive: 'text-destructive hover:bg-destructive/10',
  align: {
    left: 'left-0',
    right: 'right-0',
  },
}

interface DropdownCtx {
  open: boolean
  setOpen: (v: boolean) => void
  align: keyof typeof styles.align
}

const Ctx = createContext<DropdownCtx | null>(null)

function useDropdown() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('Dropdown compound used outside <Dropdown>')
  return ctx
}

function DropdownRoot({
  children,
  align = 'left',
  className,
}: {
  children: React.ReactNode
  align?: keyof typeof styles.align
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [close])

  return (
    <Ctx.Provider value={{ open, setOpen, align }}>
      <div ref={ref} className={cn(styles.base, className)}>
        {children}
      </div>
    </Ctx.Provider>
  )
}

function Trigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useDropdown()
  return (
    <button
      className={className}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  )
}

function Menu({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { open, align } = useDropdown()
  if (!open) return null
  return (
    <div className={cn(styles.menu, styles.align[align], className)}>
      {children}
    </div>
  )
}

function Item({
  children,
  onClick,
  icon,
  destructive,
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  icon?: React.ReactNode
  destructive?: boolean
  className?: string
}) {
  const { setOpen } = useDropdown()
  return (
    <button
      className={cn(
        styles.item,
        destructive && styles.destructive,
        className
      )}
      onClick={() => {
        onClick?.()
        setOpen(false)
      }}
    >
      {icon}
      {children}
    </button>
  )
}

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger,
  Menu,
  Item,
})
`
