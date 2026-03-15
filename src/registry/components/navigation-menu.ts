export const navigationMenu = `'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  root: 'relative',
  list: 'flex items-center gap-1',
  item: 'relative',
  trigger: cn(
    'inline-flex items-center gap-1 px-3 py-2',
    'text-sm font-medium text-foreground rounded-lg',
    'hover:bg-accent transition-colors cursor-pointer',
    'outline-none'
  ),
  triggerIcon: 'w-3.5 h-3.5 transition-transform duration-200',
  content: cn(
    'absolute left-0 top-full min-w-[220px] z-50',
    'bg-card border border-border rounded-xl p-2',
    'shadow-lg shadow-black/8',
    'origin-[var(--origin)]',
    'transition-[opacity,visibility]',
    'duration-150 ease-in'
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
    <li className={cn('group/item', styles.item, className)}>
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
    <button className={cn(styles.trigger, className)} {...props}>
      {children}
      <ChevronDown className={cn(styles.triggerIcon, 'group-hover/item:rotate-180')} />
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
      className={cn(
        styles.content,
        'opacity-0 invisible',
        'group-hover/item:opacity-100',
        'group-hover/item:visible',
        'group-hover/item:ease-out',
        className
      )}
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
