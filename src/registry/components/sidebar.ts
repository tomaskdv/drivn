export const sidebar = `'use client'

import * as React from 'react'
import { ChevronDown, PanelLeft } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'flex flex-col h-full bg-card border-border overflow-hidden',
    'transition-[width] duration-200 ease-in-out'
  ),
  variants: {
    default: 'border-r',
    floating: cn(
      'border rounded-xl shadow-lg m-2',
      'h-[calc(100%-16px)]'
    ),
  },
  width: {
    expanded: 'w-[240px]',
    collapsed: 'w-[60px]',
  },
  header: cn(
    'flex items-center gap-2 px-3 py-3',
    'border-b border-border shrink-0'
  ),
  content: 'flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1',
  footer: cn(
    'flex items-center mt-auto px-3 py-3',
    'border-t border-border shrink-0'
  ),
  group: 'py-2',
  groupHeading: cn(
    'flex items-center justify-between w-full',
    'px-2 py-1.5 text-xs font-medium text-muted-foreground',
    'hover:text-foreground/80 transition-colors cursor-pointer'
  ),
  groupIcon: cn(
    'w-3 h-3 text-muted-foreground/60',
    'transition-transform duration-200'
  ),
  groupPanel: 'grid transition-[grid-template-rows] duration-200',
  groupContent: 'overflow-hidden flex flex-col gap-1',
  item: cn(
    'flex items-center gap-3 w-full px-2 py-2',
    'text-sm text-muted-foreground rounded-lg',
    'hover:bg-accent hover:text-foreground',
    'transition-colors cursor-pointer'
  ),
  itemActive: 'bg-accent text-foreground font-medium',
  itemIcon: 'w-4 h-4 shrink-0',
  itemBadge: cn(
    'ml-auto text-xs font-medium px-1.5 py-0.5',
    'rounded-md bg-primary/10 text-primary'
  ),
  separator: 'mx-2 my-2 h-px border-0 bg-muted',
  collapseBtn: cn(
    'flex items-center justify-center',
    'w-7 h-7 rounded-md ml-auto shrink-0',
    'text-muted-foreground hover:text-foreground',
    'hover:bg-accent transition-colors cursor-pointer'
  ),
}

type Variant = keyof typeof styles.variants
type Side = 'left' | 'right'
type IconProp = React.ComponentType<{ className?: string }> | React.ReactElement

interface SidebarCtx {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  variant: Variant
  side: Side
}

function SidebarRoot({
  children,
  defaultCollapsed = false,
  collapsed: controlled,
  onCollapsedChange,
  variant = 'default',
  side = 'left',
  className,
}: {
  children: React.ReactNode
  defaultCollapsed?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  variant?: Variant
  side?: Side
  className?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultCollapsed)
  const collapsed = controlled ?? uncontrolled
  const setCollapsed = React.useCallback(
    (v: boolean) => {
      onCollapsedChange?.(v)
      if (controlled === undefined) setUncontrolled(v)
    },
    [controlled, onCollapsedChange]
  )

  return (
    <Ctx.Provider value={{ collapsed, setCollapsed, variant, side }}>
      <aside
        className={cn(styles.base, styles.variants[variant], collapsed ? styles.width.collapsed : styles.width.expanded, className)}
      >
        {children}
      </aside>
    </Ctx.Provider>
  )
}

function Header({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { collapsed } = useSidebar()
  return (
    <div className={cn(styles.header, collapsed && 'justify-center px-2 gap-0', className)}>
      {children}
    </div>
  )
}

function CollapseButton({
  className,
}: {
  className?: string
}) {
  const { collapsed, setCollapsed } = useSidebar()
  return (
    <button
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className={cn(styles.collapseBtn, collapsed && 'ml-0', className)}
      onClick={() => setCollapsed(!collapsed)}
    >
      <PanelLeft className={cn('w-4 h-4 transition-transform duration-200', collapsed && 'rotate-180')} />
    </button>
  )
}

function SidebarContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(styles.content, className)}>
      {children}
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
  const { collapsed } = useSidebar()
  return (
    <div className={cn(styles.footer, collapsed && 'px-2 justify-center overflow-hidden', className)}>
      {children}
    </div>
  )
}

function Group({
  children,
  heading,
  defaultOpen = true,
  collapsible = true,
  className,
}: {
  children: React.ReactNode
  heading?: string
  defaultOpen?: boolean
  collapsible?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const { collapsed } = useSidebar()

  return (
    <div className={cn(styles.group, className)}>
      {heading && !collapsed && (
        collapsible ? (
          <button
            className={styles.groupHeading}
            onClick={() => setOpen(!open)}
          >
            {heading}
            <ChevronDown className={cn(styles.groupIcon, open && 'rotate-180')} />
          </button>
        ) : (
          <span className={styles.groupHeading}>
            {heading}
          </span>
        )
      )}
      <div
        className={styles.groupPanel}
        style={{ gridTemplateRows: !heading || open || collapsed ? '1fr' : '0fr' }}
      >
        <div className={styles.groupContent}>
          {children}
        </div>
      </div>
    </div>
  )
}

function Item({
  children,
  icon: Icon,
  active,
  badge,
  className,
  ...props
}: {
  children: React.ReactNode
  icon?: IconProp
  active?: boolean
  badge?: string | number
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { collapsed } = useSidebar()
  return (
    <button
      className={cn(styles.item, active && styles.itemActive, collapsed && 'justify-center px-0', className)}
      title={collapsed ? String(children) : undefined}
      {...props}
    >
      {Icon && (
        React.isValidElement(Icon)
          ? Icon
          : <Icon className={styles.itemIcon} />
      )}
      {!collapsed && (
        <>
          <span className="truncate">{children}</span>
          {badge !== undefined && (
            <span className={styles.itemBadge}>
              {badge}
            </span>
          )}
        </>
      )}
    </button>
  )
}

function SidebarSeparator({
  className,
}: {
  className?: string
}) {
  return <hr className={cn(styles.separator, className)} />
}

const Ctx = React.createContext<SidebarCtx | null>(null)

function useSidebar() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Sidebar compound used outside <Sidebar>')
  return ctx
}

export { useSidebar }

export const Sidebar = Object.assign(SidebarRoot, {
  Header,
  Content: SidebarContent,
  Footer,
  Group,
  Item,
  Separator: SidebarSeparator,
  CollapseButton,
})
`
