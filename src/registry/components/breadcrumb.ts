export const breadcrumb = `import * as React from 'react'
import { cn } from '@/utils/cn'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

const styles = {
  list: cn(
    'flex items-center gap-1.5',
    'flex-wrap text-sm text-muted-foreground'
  ),
  link: cn(
    'transition-colors hover:text-foreground',
    'inline-flex items-center gap-1'
  ),
  page: 'font-medium text-foreground',
  separator: 'text-muted-foreground/60 [&>svg]:size-3.5',
  ellipsis: cn(
    'flex size-9 items-center justify-center',
    'text-muted-foreground'
  ),
}

function BreadcrumbRoot({
  separator,
  className,
  children,
}: {
  separator?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn(styles.list, className)}>
        {React.Children.toArray(children).flatMap((child, i) => {
          return !(React.isValidElement(child) &&
            child.type === BreadcrumbSeparator) && i > 0 ? [
              <BreadcrumbSeparator key={\`sep-\${i}\`}>
                {separator}
              </BreadcrumbSeparator>,
              child,
            ] : [child]
        })}
      </ol>
    </nav>
  )
}

function Item({
  href,
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <a
        href={href}
        className={cn(styles.link, className)}
        {...props}
      >
        {children}
      </a>
    </li>
  )
}

function Page({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <li aria-current="page">
      <span className={cn(styles.page, className)}>
        {children}
      </span>
    </li>
  )
}

function BreadcrumbSeparator({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <li role="presentation" aria-hidden="true">
      <span className={styles.separator}>
        {children ?? <ChevronRight />}
      </span>
    </li>
  )
}

function Ellipsis() {
  return (
    <li>
      <span className={styles.ellipsis}>
        <MoreHorizontal className="size-4" />
        <span className="sr-only">More pages</span>
      </span>
    </li>
  )
}

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item,
  Page,
  Separator: BreadcrumbSeparator,
  Ellipsis,
})
`
