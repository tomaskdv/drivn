export const pagination = `import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  nav: 'mx-auto flex w-full justify-center',
  content: 'flex flex-row items-center gap-1',
  link: cn(
    'inline-flex items-center justify-center',
    'h-9 min-w-9 px-3 rounded-[10px] text-sm font-medium',
    'text-muted-foreground hover:text-foreground',
    'hover:bg-accent transition-colors cursor-pointer'
  ),
  active: cn(
    'bg-foreground text-background',
    'hover:bg-foreground hover:text-background'
  ),
  nav_link: cn(
    'inline-flex items-center justify-center',
    'h-9 px-3 gap-1 rounded-[10px] text-sm font-medium',
    'text-muted-foreground hover:text-foreground',
    'hover:bg-accent transition-colors cursor-pointer'
  ),
  ellipsis: cn(
    'flex h-9 w-9 items-center justify-center',
    'text-muted-foreground'
  ),
}

function PaginationRoot({
  className,
  ...props
}: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(styles.nav, className)}
      {...props}
    />
  )
}

function Content({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      className={cn(styles.content, className)}
      {...props}
    />
  )
}

function Item({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return <li className={className} {...props} />
}

function Link({
  isActive,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean
}) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(styles.link, isActive && styles.active, className)}
      {...props}
    />
  )
}

function Previous({
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      aria-label="Go to previous page"
      className={cn(styles.nav_link, className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      {children ?? <span>Previous</span>}
    </a>
  )
}

function Next({
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      aria-label="Go to next page"
      className={cn(styles.nav_link, className)}
      {...props}
    >
      {children ?? <span>Next</span>}
      <ChevronRight className="h-4 w-4" />
    </a>
  )
}

function PaginationEllipsis({
  className,
}: {
  className?: string
}) {
  return (
    <span className={cn(styles.ellipsis, className)}>
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export const Pagination = Object.assign(PaginationRoot, {
  Content,
  Item,
  Link,
  Previous,
  Next,
  Ellipsis: PaginationEllipsis,
})
`
