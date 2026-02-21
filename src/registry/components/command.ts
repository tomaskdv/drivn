export const command = `'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Dialog } from '@/components/ui/dialog'

const styles = {
  root: cn(
    'flex flex-col overflow-hidden',
    'bg-card border border-border rounded-[10px]'
  ),
  input: {
    wrapper: cn(
      'flex items-center gap-2 px-3',
      'border-b border-border'
    ),
    icon: 'w-4 h-4 shrink-0 text-muted-foreground',
    field: cn(
      'flex h-10 w-full bg-transparent py-2',
      'text-sm text-foreground outline-none',
      'placeholder:text-muted-foreground',
      'disabled:cursor-not-allowed disabled:opacity-50'
    ),
  },
  list: cn(
    'h-[300px] overflow-y-auto overflow-x-hidden p-1',
    '[&_[cmdk-list-sizer]]:space-y-1'
  ),
  empty: cn(
    'py-6 text-center text-sm',
    'text-muted-foreground'
  ),
  loading: cn(
    'py-6 text-center text-sm',
    'text-muted-foreground'
  ),
  group: cn(
    'overflow-hidden',
    '[&_[cmdk-group-heading]]:px-2',
    '[&_[cmdk-group-heading]]:py-1.5',
    '[&_[cmdk-group-heading]]:text-xs',
    '[&_[cmdk-group-heading]]:font-medium',
    '[&_[cmdk-group-heading]]:text-muted-foreground'
  ),
  item: cn(
    'relative flex items-center gap-2 px-2 py-1.5',
    'text-sm rounded-lg cursor-default select-none',
    'data-[selected=true]:bg-accent',
    'data-[selected=true]:text-accent-foreground',
    'data-[disabled=true]:pointer-events-none',
    'data-[disabled=true]:opacity-50'
  ),
  separator: '-mx-1 h-px bg-border',
  shortcut: cn(
    'ml-auto text-xs tracking-widest',
    'text-muted-foreground'
  ),
}

function CommandRoot({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

function Input({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className={styles.input.wrapper}>
      <Search className={styles.input.icon} />
      <CommandPrimitive.Input
        className={cn(styles.input.field, className)}
        {...props}
      />
    </div>
  )
}

function List({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn(styles.list, className)}
      {...props}
    />
  )
}

function Empty({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className={cn(styles.empty, className)}
      {...props}
    >
      {children ?? 'No results found.'}
    </CommandPrimitive.Empty>
  )
}

function Group({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

function Item({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(styles.item, className)}
      {...props}
    />
  )
}

function Separator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      className={cn(styles.separator, className)}
      {...props}
    />
  )
}

function Loading({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Loading>) {
  return (
    <CommandPrimitive.Loading
      className={cn(styles.loading, className)}
      {...props}
    />
  )
}

function Shortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(styles.shortcut, className)}
      {...props}
    />
  )
}

function CommandDialog({
  open,
  onOpenChange,
  label,
  className,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  label?: string
  className?: string
  children: React.ReactNode
}) {
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        className={cn(
          'p-0 max-w-lg rounded-[10px]',
          className
        )}
      >
        <CommandPrimitive
          label={label}
          className="flex flex-col overflow-hidden"
        >
          {children}
        </CommandPrimitive>
      </Dialog.Content>
    </Dialog>
  )
}

export const Command = Object.assign(CommandRoot, {
  Input,
  List,
  Empty,
  Group,
  Item,
  Separator,
  Loading,
  Shortcut,
  Dialog: CommandDialog,
})
`