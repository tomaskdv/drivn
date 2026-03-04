export const dialog = `'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'

const styles = {
  base: cn(
    'fixed inset-0 m-0 p-0 border-none outline-none',
    'max-w-none max-h-none w-screen h-dvh',
    'flex items-center justify-center bg-overlay',
    'backdrop-blur-sm transition-opacity duration-150',
    'ease-out'
  ),
  content: cn(
    'relative w-full max-w-md mx-4 p-6 shadow-xl',
    'bg-card border border-border rounded-[20px]',
    'transition-[scale] duration-150 ease-out'
  ),
  title: 'text-lg font-semibold text-foreground mb-4',
  close: cn(
    'absolute top-4 right-4 w-8 h-8 cursor-pointer',
    'flex items-center justify-center rounded-full outline-none',
    'text-muted-foreground hover:text-foreground',
    'hover:bg-accent transition-colors'
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
  const setOpen = (v: boolean) => {
    onOpenChange?.(v)
    if (controlled === undefined) setUncontrolled(v)
  }

  return (
    <Ctx.Provider value={{ open, setOpen }}>
      {children}
    </Ctx.Provider>
  )
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
  showClose = true,
  className,
}: {
  children: React.ReactNode
  title?: string
  showClose?: boolean
  className?: string
}) {
  const { open, setOpen } = useDialog()
  const ref = React.useRef<HTMLDialogElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const onCancel = (e: Event) => {
      e.preventDefault()
      setOpen(false)
    }
    el.addEventListener('cancel', onCancel)
    if (open) {
      if (!el.open) el.showModal()
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => setVisible(true))
      return () => {
        el.removeEventListener('cancel', onCancel)
        document.body.style.overflow = ''
      }
    }
    setVisible(false)
    const id = setTimeout(() => {
      if (el.open) el.close()
    }, 150)
    return () => {
      el.removeEventListener('cancel', onCancel)
      clearTimeout(id)
    }
  }, [open, setOpen])

  return (
    <dialog
      ref={ref}
      className={cn(styles.base, visible ? 'opacity-100' : 'opacity-0 pointer-events-none')}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div className={cn(styles.content, visible ? 'scale-100' : 'scale-95', className)}>
        {title && (
          <h2 className={styles.title}>{title}</h2>
        )}
        {showClose && (
          <button
            className={styles.close}
            onClick={() => setOpen(false)}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        {children}
      </div>
    </dialog>
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
})
`