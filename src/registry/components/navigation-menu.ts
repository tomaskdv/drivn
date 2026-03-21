export const navigationMenu = `'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  root: 'relative',
  list: 'flex items-center gap-1',
  item: 'relative group/item',
  trigger: cn(
    'inline-flex items-center gap-1 px-3 py-2',
    'text-sm font-medium text-foreground rounded-lg',
    'hover:bg-accent transition-colors cursor-pointer',
    'outline-none'
  ),
  triggerIcon: cn(
    'w-3.5 h-3.5 transition-transform duration-200',
    'group-hover/item:rotate-180',
    'group-focus-within/item:rotate-180'
  ),
  content: cn(
    'absolute left-0 top-full min-w-[220px] z-50',
    'bg-card border border-border rounded-xl p-2',
    'shadow-lg shadow-black/8',
    'origin-[var(--origin)]',
    'transition-[opacity,visibility]',
    'duration-150 ease-in',
    'opacity-0 invisible',
    'group-hover/item:opacity-100',
    'group-hover/item:visible',
    'group-hover/item:ease-out',
    'group-focus-within/item:opacity-100',
    'group-focus-within/item:visible',
    'group-focus-within/item:ease-out'
  ),
  link: cn(
    'flex w-full gap-3 px-3 py-2.5',
    'text-sm font-medium text-foreground rounded-lg',
    'hover:bg-accent transition-colors cursor-pointer',
    'no-underline outline-none'
  ),
}

function NavigationMenuRoot({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <nav className={cn(styles.root, className)}>
      {children}
    </nav>
  )
}

function List({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ul className={cn(styles.list, className)}>
      {children}
    </ul>
  )
}

function Item({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <li className={cn(styles.item, className)}>
      {children}
    </li>
  )
}

function Trigger({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(styles.trigger, className)}
      onPointerDown={(e) => {
        if (document.activeElement === e.currentTarget) {
          e.preventDefault()
          e.currentTarget.blur()
        } else {
          e.currentTarget.focus()
        }
      }}
      {...props}
    >
      {children}
      <ChevronDown className={styles.triggerIcon} />
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
  return (
    <div
      style={{ '--origin': '0 0' } as React.CSSProperties}
      className={cn(styles.content, className)}
    >
      {children}
    </div>
  )
}

function Link({
  children,
  href,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(styles.link, className)}
      {...props}
    >
      {children}
    </a>
  )
}

export const NavigationMenu = Object.assign(NavigationMenuRoot, {
  List,
  Item,
  Trigger,
  Content,
  Link
})
`