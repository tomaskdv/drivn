export const dialog = `'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'

const styles = {
  overlay: cn(
    'fixed inset-0 z-[200] flex items-center justify-center',
    'bg-overlay backdrop-blur-sm',
    'transition-opacity duration-150 ease-out'
  ),
  content: cn(
    'relative w-full max-w-md mx-4 p-6',
    'bg-card border border-border rounded-[20px]',
    'shadow-xl',
    'transition-[scale] duration-150 ease-out'
  ),
  title: 'text-lg font-semibold text-foreground mb-4',
  close: cn(
    'absolute top-4 right-4 w-8 h-8',
    'flex items-center justify-center rounded-full',
    'text-muted-foreground hover:text-foreground',
    'hover:bg-accent transition-colors cursor-pointer'
  ),
}

interface DialogCtx {
  open: boolean
  setOpen: (v: boolean) => void
}

function DialogRoot({
  children,
  open: controlled,
  onOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [uncontrolled, setUncontrolled] = React.useState(false)
  const open = controlled ?? uncontrolled
  const setOpen = React.useCallback(
    (v: boolean) => {
      onOpenChange?.(v)
      if (controlled === undefined) setUncontrolled(v)
    },
    [controlled, onOpenChange]
  )

  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>
}

function Trigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialog()
  return (
    <Button
      variant="outline"
      rounded="md"
      className={className}
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </Button>
  )
}

function Content({
  children,
  title,
  className,
}: {
  children: React.ReactNode
  title?: string
  className?: string
}) {
  const { open, setOpen } = useDialog()

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  return (
    <div
      className={cn(
        styles.overlay,
        open
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none'
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div
        className={cn(
          styles.content,
          open ? 'scale-100' : 'scale-95',
          className
        )}
      >
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </div>
  )
}

function Close({ className }: { className?: string }) {
  const { setOpen } = useDialog()
  return (
    <button
      className={cn(styles.close, className)}
      onClick={() => setOpen(false)}
    >
      <X className="w-3.5 h-3.5" />
    </button>
  )
}

const Ctx = React.createContext<DialogCtx | null>(null)

function useDialog() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Dialog compound used outside <Dialog>')
  return ctx
}

export const Dialog = Object.assign(DialogRoot, {
  Trigger,
  Content,
  Close,
})
`
