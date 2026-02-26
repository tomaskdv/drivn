export const drawer = `'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'

type Side = 'left' | 'right' | 'top' | 'bottom'

const styles = {
  overlay: cn(
    'group fixed inset-0 m-0 p-0 border-none outline-none',
    'max-w-none max-h-none w-screen h-dvh overflow-clip',
    'bg-transparent backdrop-blur-none',
    'open:bg-overlay open:backdrop-blur-sm',
    'starting:open:bg-transparent starting:open:backdrop-blur-none',
    'transition-[display,overlay,background-color,backdrop-filter]',
    'duration-300 ease-out transition-discrete'
  ),
  content: cn(
    'fixed flex flex-col',
    'bg-card shadow-xl',
    'transition-[translate,display,overlay] duration-300',
    'ease-out transition-discrete'
  ),
  sides: {
    right: cn(
      'right-0 top-0 h-dvh w-[400px] border-l border-border',
      'translate-x-[100%] group-open:translate-x-[0%]',
      'starting:group-open:translate-x-[100%]'
    ),
    left: cn(
      'left-0 top-0 h-dvh w-[400px] border-r border-border',
      'translate-x-[-100%] group-open:translate-x-[0%]',
      'starting:group-open:translate-x-[-100%]'
    ),
    top: cn(
      'top-0 left-0 w-screen h-[400px] border-b border-border',
      'translate-y-[-100%] group-open:translate-y-[0%]',
      'starting:group-open:translate-y-[-100%]'
    ),
    bottom: cn(
      'bottom-0 left-0 w-screen h-[400px] border-t border-border',
      'translate-y-[100%] group-open:translate-y-[0%]',
      'starting:group-open:translate-y-[100%]'
    ),
  },
  header: cn(
    'flex flex-col gap-1.5 px-6 py-4',
    'border-b border-border'
  ),
  title: 'text-lg font-semibold text-foreground',
  description: 'text-sm text-muted-foreground',
  footer: cn(
    'flex items-center gap-2 px-6 py-4',
    'border-t border-border mt-auto'
  ),
  close: cn(
    'absolute top-4 right-4 w-8 h-8 cursor-pointer',
    'flex items-center justify-center rounded-full',
    'text-muted-foreground hover:text-foreground',
    'hover:bg-accent transition-colors'
  ),
}

interface DrawerCtx {
  open: boolean
  setOpen: (v: boolean) => void
}

function DrawerRoot({
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
  const { setOpen } = useDrawer()
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
  side = 'right',
  className,
}: {
  children: React.ReactNode
  side?: Side
  className?: string
}) {
  const { open, setOpen } = useDrawer()
  const ref = React.useRef<HTMLDialogElement>(null)

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
    } else if (el.open) {
      el.close()
      document.body.style.overflow = ''
    }
    return () => el.removeEventListener('cancel', onCancel)
  }, [open, setOpen])

  return (
    <dialog
      ref={ref}
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div className={cn(styles.content, styles.sides[side], className)}>
        {children}
      </div>
    </dialog>
  )
}

function Close({ className }: { className?: string }) {
  const { setOpen } = useDrawer()
  return (
    <button
      className={cn(styles.close, className)}
      onClick={() => setOpen(false)}
    >
      <X className="w-3.5 h-3.5" />
    </button>
  )
}

function Header({
  title,
  description,
  className,
}: {
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn(styles.header, className)}>
      <h2 className={styles.title}>{title}</h2>
      {description && (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  )
}

function Footer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(styles.footer, className)}>
      {children}
    </div>
  )
}

const Ctx = React.createContext<DrawerCtx | null>(null)

function useDrawer() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Drawer compound used outside <Drawer>')
  return ctx
}

export const Drawer = Object.assign(DrawerRoot, {
  Trigger,
  Content,
  Close,
  Header,
  Footer,
})
`
