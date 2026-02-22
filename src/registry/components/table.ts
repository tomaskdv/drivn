export const table = `import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  wrapper: 'w-full overflow-x-auto',
  base: 'w-full caption-bottom text-sm border-collapse',
  variants: {
    default: '',
    striped: '[&_tbody_tr:nth-child(even)]:bg-muted/30',
    bordered: '[&_th]:border [&_td]:border',
  },
  caption: 'mt-3 text-sm text-muted-foreground',
  header: '[&_tr]:border-b [&_tr]:border-border',
  body: '[&_tr:last-child]:border-0',
  footer: 'border-t border-border bg-muted/30 font-medium',
  row: 'border-b border-border transition-colors hover:bg-muted/40',
  head: cn(
    'px-4 py-2.5 text-left font-semibold',
    'text-muted-foreground',
    '[&[align=center]]:text-center',
    '[&[align=right]]:text-right'
  ),
  cell: cn(
    'px-4 py-2.5 text-foreground',
    '[&[align=center]]:text-center',
    '[&[align=right]]:text-right'
  ),
}

function TableRoot({
  variant = 'default',
  className,
  children,
  ...props
}: {
  variant?: keyof typeof styles.variants
  className?: string
  children: React.ReactNode
} & Omit<
  React.ComponentPropsWithoutRef<'table'>,
  'className' | 'children'
>) {
  return (
    <div className={styles.wrapper}>
      <table
        className={cn(
          styles.base,
          styles.variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

function Caption({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'caption'>) {
  return (
    <caption
      className={cn(styles.caption, className)}
      {...props}
    >
      {children}
    </caption>
  )
}

function Header({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'thead'>) {
  return (
    <thead
      className={cn(styles.header, className)}
      {...props}
    >
      {children}
    </thead>
  )
}

function Body({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'tbody'>) {
  return (
    <tbody
      className={cn(styles.body, className)}
      {...props}
    >
      {children}
    </tbody>
  )
}

function Footer({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'tfoot'>) {
  return (
    <tfoot
      className={cn(styles.footer, className)}
      {...props}
    >
      {children}
    </tfoot>
  )
}

function Row({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'tr'>) {
  return (
    <tr
      className={cn(styles.row, className)}
      {...props}
    >
      {children}
    </tr>
  )
}

function Head({
  scope = 'col',
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'th'>) {
  return (
    <th
      scope={scope}
      className={cn(styles.head, className)}
      {...props}
    >
      {children}
    </th>
  )
}

function Cell({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'td'>) {
  return (
    <td
      className={cn(styles.cell, className)}
      {...props}
    >
      {children}
    </td>
  )
}

export const Table = Object.assign(TableRoot, {
  Caption,
  Header,
  Body,
  Footer,
  Row,
  Head,
  Cell,
})
`
