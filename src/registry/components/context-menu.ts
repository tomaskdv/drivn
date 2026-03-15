export const contextMenu = `'use client'

import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  trigger: 'contents',
  content: cn(
    'fixed min-w-[180px] z-50',
    'bg-card border border-border rounded-[10px] p-1',
    'shadow-lg',
    'transition-[opacity,visibility] duration-150 ease-in'
  ),
  item: cn(
    'flex items-center gap-2 w-full px-3 py-2',
    'text-sm text-foreground rounded-lg',
    'hover:bg-accent transition-colors cursor-pointer'
  ),
  destructive: 'text-destructive hover:bg-destructive/10',
  disabled: 'opacity-50 pointer-events-none',
  shortcut: 'ml-auto text-xs text-muted-foreground',
  group: 'py-1',
  label: cn(
    'px-3 py-1.5 text-xs font-medium',
    'text-muted-foreground'
  ),
  separator: 'my-1 h-px bg-border',
  sub: 'relative group/sub',
  subContent: cn(
    'absolute left-full top-0 min-w-[180px] z-50',
    'bg-card border border-border rounded-[10px] p-1',
    'shadow-lg',
    'transition-[opacity,visibility] duration-150 ease-in',
    'opacity-0 invisible',
    'group-hover/sub:opacity-100',
    'group-hover/sub:visible',
    'group-hover/sub:ease-out'
  ),
}

interface ContextMenuCtx {
  open: boolean
  setOpen: (v: boolean) => void
  pos: { x: number; y: number }
}

type IconProp = React.ComponentType<{ className?: string }> | React.ReactElement

function ContextMenuRoot({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [pos, setPos] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const onContextMenu = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setPos({ x: e.clientX, y: e.clientY })
      setOpen(true)
    }, [])

  return (
    <Ctx.Provider value={{ open, setOpen, pos }}>
      <div className={className}>
        <div className={styles.trigger} onContextMenu={onContextMenu}>
          {children}
        </div>
      </div>
    </Ctx.Provider>
  )
}

function Trigger({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

function Content({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { open, pos } = useContextMenu()
  return (
    <div
      style={{ left: pos.x, top: pos.y }}
      className={cn(
        styles.content,
        open ? 'opacity-100 visible ease-out' : 'opacity-0 invisible',
        className
      )}
    >
      {children}
    </div>
  )
}

function Item({
  children,
  onClick,
  icon: Icon,
  shortcut,
  destructive,
  disabled,
  className,
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  icon?: IconProp
  shortcut?: string
  destructive?: boolean
  disabled?: boolean
  className?: string
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'disabled'
>) {
  const { setOpen } = useContextMenu()
  return (
    <button
      disabled={disabled}
      className={cn(
        styles.item,
        destructive && styles.destructive,
        disabled && styles.disabled,
        className
      )}
      onClick={() => {
        onClick?.()
        setOpen(false)
      }}
      {...props}
    >
      {Icon && (React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />)}
      {children}
      {shortcut && (
        <span className={styles.shortcut}>{shortcut}</span>
      )}
    </button>
  )
}

function Sub({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(styles.sub, className)}>
      {children}
    </div>
  )
}

function SubTrigger({
  children,
  icon: Icon,
  className,
  ...props
}: {
  children: React.ReactNode
  icon?: IconProp
  className?: string
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
>) {
  return (
    <button
      className={cn(styles.item, className)}
      {...props}
    >
      {Icon && (React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />)}
      {children}
      <ChevronRight className="ml-auto w-4 h-4" />
    </button>
  )
}

function SubContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(styles.subContent, className)}>
      {children}
    </div>
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

function ContextMenuLabel({
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

function ContextMenuSeparator({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn(styles.separator, className)} />
  )
}

const Ctx = React.createContext<ContextMenuCtx | null>(null)

function useContextMenu() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('ContextMenu compound used outside <ContextMenu>')
  return ctx
}

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger,
  Content,
  Item,
  Sub,
  SubTrigger,
  SubContent,
  Group,
  Label: ContextMenuLabel,
  Separator: ContextMenuSeparator,
})
`