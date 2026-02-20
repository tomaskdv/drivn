export const dropdown = `'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'

const styles = {
  base: 'relative inline-flex',
  content: cn(
    'absolute top-full mt-1 min-w-[180px] z-50',
    'bg-card border border-border rounded-[10px] p-1',
    'shadow-lg',
    'transition-[opacity,scale] duration-150 ease-out'
  ),
  item: cn(
    'flex items-center gap-2 w-full px-3 py-2',
    'text-sm text-foreground rounded-lg',
    'hover:bg-accent transition-colors cursor-pointer'
  ),
  destructive: 'text-destructive hover:bg-destructive/10',
  group: 'py-1',
  label: cn(
    'px-3 py-1.5 text-xs font-medium',
    'text-muted-foreground'
  ),
  separator: 'my-1 h-px bg-border',
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

type IconProp = React.ComponentType<{ className?: string }> | React.ReactElement

function DropdownRoot({
  children,
  align = 'left',
  className,
}: {
  children: React.ReactNode
  align?: keyof typeof styles.align
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const close = React.useCallback(
    () => setOpen(false),
    []
  )

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node))
        close()
    }
    document.addEventListener('mousedown', onClick)
    return () =>
      document.removeEventListener('mousedown', onClick)
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
  const { open, align } = useDropdown()
  return (
    <div className={cn(styles.content, styles.align[align], open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none', className)}>
      {children}
    </div>
  )
}

function Item({
  children,
  onClick,
  icon: Icon,
  destructive,
  className,
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  icon?: IconProp
  destructive?: boolean
  className?: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  const { setOpen } = useDropdown()
  return (
    <button
      className={cn(styles.item, destructive && styles.destructive, className)}
      onClick={() => {
        onClick?.()
        setOpen(false)
      }}
      {...props}
    >
      {Icon && (
        React.isValidElement(Icon)
          ? Icon
          : <Icon className="w-4 h-4" />
      )}
      {children}
    </button>
  )
}

function Group({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(styles.group, className)}>
      {children}
    </div>
  )
}

function Label({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(styles.label, className)}>
      {children}
    </div>
  )
}

function DropdownSeparator({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn(styles.separator, className)} />
  )
}

const Ctx = React.createContext<DropdownCtx | null>(null)

function useDropdown() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Dropdown compound used outside <Dropdown>')
  return ctx
}

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger,
  Content,
  Item,
  Group,
  Label,
  Separator: DropdownSeparator,
})
`
