export const popover = `'use client'

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
  content: cn(
    'absolute z-50 min-w-[200px] p-4',
    'bg-card border border-border rounded-[12px]',
    'shadow-lg'
  ),
  positions: {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  },
}

interface PopoverCtx {
  open: boolean
  setOpen: (v: boolean) => void
  position: keyof typeof styles.positions
}

const Ctx = createContext<PopoverCtx | null>(null)

function usePopover() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('Popover compound used outside <Popover>')
  return ctx
}

function PopoverRoot({
  children,
  position = 'bottom',
  className,
}: {
  children: React.ReactNode
  position?: keyof typeof styles.positions
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
    <Ctx.Provider value={{ open, setOpen, position }}>
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
  const { open, setOpen } = usePopover()
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

function Content({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { open, position } = usePopover()
  if (!open) return null
  return (
    <div
      className={cn(
        styles.content,
        styles.positions[position],
        className
      )}
    >
      {children}
    </div>
  )
}

export const Popover = Object.assign(PopoverRoot, {
  Trigger,
  Content,
})
`
