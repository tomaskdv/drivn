export const select = `'use client'

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  base: 'relative',
  trigger: cn(
    'flex items-center justify-between w-full h-10 px-4',
    'bg-accent border border-input rounded-[10px] text-sm',
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
    'shadow-lg max-h-[200px] overflow-y-auto'
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

const Ctx = createContext<SelectCtx | null>(null)

function useSelect() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('Select compound used outside <Select>')
  return ctx
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
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])
  const onSelect = useCallback(
    (v: string) => {
      onChange?.(v)
      close()
    },
    [onChange, close]
  )

  useEffect(() => {
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
}: {
  placeholder?: string
  children?: React.ReactNode
  className?: string
}) {
  const { open, setOpen } = useSelect()
  return (
    <button
      className={cn(styles.trigger, className)}
      onClick={() => setOpen(!open)}
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
  if (!open) return null
  return (
    <div className={cn(styles.menu, className)}>
      {children}
    </div>
  )
}

function Option({
  value: optValue,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const { value, onSelect } = useSelect()
  return (
    <button
      className={cn(
        styles.option,
        optValue === value && styles.selected,
        className
      )}
      onClick={() => onSelect(optValue)}
    >
      {children}
    </button>
  )
}

export const Select = Object.assign(SelectRoot, {
  Trigger,
  Menu,
  Option,
})
`
