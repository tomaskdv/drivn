export const select = `'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  base: 'relative',
  trigger: cn(
    'flex items-center justify-between w-full h-10 px-4',
    'border border-input rounded-[10px] text-sm',
    'focus:outline-none transition-colors',
    'cursor-pointer'
  ),
  placeholder: 'text-muted-foreground',
  chevron: cn(
    'w-4 h-4 text-muted-foreground',
    'transition-transform duration-200'
  ),
  menu: cn(
    'absolute top-full left-0 right-0 mt-1 z-50',
    'bg-card border border-border rounded-[10px] p-1',
    'shadow-lg max-h-[200px] overflow-y-auto',
    'transition-[opacity,scale] duration-150 ease-out'
  ),
  option: cn(
    'flex items-center w-full px-3 py-2 text-sm rounded-lg',
    'hover:bg-accent transition-colors cursor-pointer'
  ),
  selected: 'text-primary font-medium',
}

interface SelectCtx {
  open: boolean
  setOpen: (v: boolean) => void
  value: string | undefined
  onSelect: (v: string) => void
}

function SelectRoot({
  children,
  value,
  onChange,
  className,
}: {
  children: React.ReactNode
  value?: string
  onChange?: (value: string) => void
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const close = React.useCallback(() => setOpen(false), [])
  const onSelect = React.useCallback(
    (v: string) => {
      onChange?.(v)
      close()
    },
    [onChange, close]
  )

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [close])

  return (
    <Ctx.Provider value={{ open, setOpen, value, onSelect }}>
      <div ref={ref} className={cn(styles.base, className)}>
        {children}
      </div>
    </Ctx.Provider>
  )
}

function Trigger({
  placeholder = 'Select...',
  children,
  className,
  ...props
}: {
  placeholder?: string
  children?: React.ReactNode
  className?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  const { open, setOpen } = useSelect()
  return (
    <button
      className={cn(styles.trigger, className)}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <span className={!children ? styles.placeholder : undefined}>
        {children ?? placeholder}
      </span>
      <ChevronDown className={cn(styles.chevron, open && 'rotate-180')} />
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
  const { open } = useSelect()
  return (
    <div className={cn(styles.menu, open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none', className)}>
      {children}
    </div>
  )
}

function Option({
  value: optValue,
  children,
  className,
  ...props
}: {
  value: string
  children: React.ReactNode
  className?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  const { value, onSelect } = useSelect()
  return (
    <button
      className={cn(styles.option, optValue === value && styles.selected, className)}
      onClick={() => onSelect(optValue)}
      {...props}
    >
      {children}
    </button>
  )
}

const Ctx = React.createContext<SelectCtx | null>(null)

function useSelect() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Select compound used outside <Select>')
  return ctx
}

export const Select = Object.assign(SelectRoot, {
  Trigger,
  Menu,
  Option,
})
`
