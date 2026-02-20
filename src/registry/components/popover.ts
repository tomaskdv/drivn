export const popover = `'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'

const styles = {
  base: 'relative inline-flex',
  content: cn(
    'absolute z-50 min-w-[200px] p-4',
    'bg-card border border-border rounded-[12px]',
    'shadow-lg',
    'transition-[opacity,scale] duration-150 ease-out'
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

function PopoverRoot({
  children,
  position = 'bottom',
  className,
}: {
  children: React.ReactNode
  position?: keyof typeof styles.positions
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const close = React.useCallback(() => setOpen(false), [])

  React.useEffect(() => {
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
    <Button
      variant="outline"
      rounded="md"
      className={className}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </Button>
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
  return (
    <div className={cn(styles.content, styles.positions[position], open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none', className)}>
      {children}
    </div>
  )
}

const Ctx = React.createContext<PopoverCtx | null>(null)

function usePopover() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Popover compound used outside <Popover>')
  return ctx
}

export const Popover = Object.assign(PopoverRoot, {
  Trigger,
  Content
})
`
