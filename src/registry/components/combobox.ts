export const combobox = `'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { ChevronDown, X, Check, Search } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  base: 'relative',
  trigger: {
    base: cn(
      'flex items-center justify-between w-full min-h-10',
      'px-3 gap-2',
      'border border-input rounded-[10px] text-sm',
      'focus:outline-none transition-colors',
      'cursor-pointer'
    ),
    singleText: 'flex-1 truncate text-left',
    multiText: cn(
      'flex flex-1 flex-wrap items-center gap-1',
      'min-h-[36px] py-1'
    ),
    placeholder: 'text-muted-foreground',
    chevron: cn(
      'w-4 h-4 shrink-0 text-muted-foreground',
      'transition-transform duration-200'
    ),
    clear: cn(
      'w-4 h-4 shrink-0 text-muted-foreground',
      'hover:text-foreground transition-colors'
    ),
  },
  tag: {
    base: cn(
      'inline-flex items-center gap-1 px-2 py-0.5',
      'text-xs rounded-md bg-muted text-foreground'
    ),
    remove: cn(
      'w-3 h-3 text-muted-foreground',
      'hover:text-foreground cursor-pointer'
    ),
  },
  content: cn(
    'absolute top-full left-0 right-0 mt-1 z-50',
    'bg-card border border-border rounded-[10px]',
    'shadow-lg overflow-hidden',
    'transition-[opacity,scale] duration-150 ease-out'
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
      'placeholder:text-muted-foreground'
    ),
  },
  list: cn(
    'max-h-[200px] overflow-y-auto p-1',
    '[&_[cmdk-list-sizer]]:space-y-0.5'
  ),
  empty: cn(
    'py-6 text-center text-sm',
    'text-muted-foreground'
  ),
  group: cn(
    'overflow-hidden',
    '[&_[cmdk-group-heading]]:px-1.5',
    '[&_[cmdk-group-heading]]:py-1.5',
    '[&_[cmdk-group-heading]]:text-xs',
    '[&_[cmdk-group-heading]]:font-medium',
    '[&_[cmdk-group-heading]]:text-muted-foreground'
  ),
  label: cn(
    'px-1.5 py-1.5 text-xs font-medium',
    'text-muted-foreground'
  ),
  item: cn(
    'relative flex items-center gap-2 px-2.5 py-1.5',
    'text-sm rounded-lg cursor-default select-none',
    'data-[selected=true]:bg-accent',
    'data-[disabled=true]:pointer-events-none',
    'data-[disabled=true]:opacity-50'
  ),
  icon: 'w-4 h-4 shrink-0 text-primary ml-auto',
  separator: 'w-full h-px bg-border',
}

type IconProp = React.ComponentType<{ className?: string }> | React.ReactElement

interface ComboboxCtx {
  open: boolean
  setOpen: (v: boolean) => void
  multiple: boolean
  value: string | string[]
  onSelect: (v: string) => void
  onClear: () => void
}

function ComboboxRoot({
  children,
  value,
  onChange,
  multiple = false,
  className,
}: {
  children: React.ReactNode
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  multiple?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const close = React.useCallback(() => setOpen(false), [])

  const onSelect = React.useCallback(
    (v: string) => {
      if (multiple) {
        const arr = (value as string[]) ?? []
        const next = arr.includes(v)
          ? arr.filter((i) => i !== v)
          : [...arr, v]
        onChange?.(next)
      } else {
        onChange?.(v)
        close()
      }
    },
    [multiple, value, onChange, close]
  )

  const onClear = React.useCallback(() => {
    onChange?.(multiple ? [] : '')
  }, [multiple, onChange])

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
    <Ctx.Provider
      value={{
        open,
        setOpen,
        multiple,
        value: value ?? (multiple ? [] : ''),
        onSelect,
        onClear,
      }}
    >
      <div ref={ref} className={cn(styles.base, className)}>
        {children}
      </div>
    </Ctx.Provider>
  )
}

function Trigger({
  placeholder = 'Select...',
  clearable = false,
  children,
  className,
  ...props
}: {
  placeholder?: string
  clearable?: boolean
  children?: React.ReactNode
  className?: string
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick'
>) {
  const { open, setOpen, multiple, value, onSelect, onClear } = useCombobox()

  const values = Array.isArray(value) ? value : []

  const hasValue = multiple
    ? values.length > 0
    : (value as string) !== ''

  return (
    <button
      className={cn(styles.trigger.base, className)}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {multiple ? (
        <span className={styles.trigger.multiText}>
          {values.length === 0 ? (
            <span className={styles.trigger.placeholder}>
              {placeholder}
            </span>
          ) : (
            <>
              {values.map((v) => (
                <span key={v} className={styles.tag.base}>
                  {v}
                  <X
                    className={styles.tag.remove}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      onSelect(v)
                    }}
                  />
                </span>
              ))}
            </>
          )}
        </span>
      ) : (
        <span
          className={cn(
            styles.trigger.singleText,
            !hasValue && styles.trigger.placeholder
          )}
        >
          {hasValue ? (children ?? value) : placeholder}
        </span>
      )}
      {clearable && hasValue ? (
        <X
          className={styles.trigger.clear}
          onMouseDown={(e) => {
            e.stopPropagation()
            e.preventDefault()
            onClear()
          }}
        />
      ) : (
        <ChevronDown className={cn(styles.trigger.chevron, open && 'rotate-180')} />
      )}
    </button>
  )
}

function Content({
  placeholder = 'Search...',
  children,
  className,
}: {
  placeholder?: string
  children: React.ReactNode
  className?: string
}) {
  const { open } = useCombobox()

  return (
    <div
      className={cn(
        styles.content,
        open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
        className
      )}
    >
      <CommandPrimitive key={open ? 'open' : 'closed'} shouldFilter>
        <div className={styles.input.wrapper}>
          <Search className={styles.input.icon} />
          <CommandPrimitive.Input
            autoFocus
            className={styles.input.field}
            placeholder={placeholder}
          />
        </div>
        <CommandPrimitive.List className={styles.list}>
          {children}
        </CommandPrimitive.List>
      </CommandPrimitive>
    </div>
  )
}

function Empty({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <CommandPrimitive.Empty className={cn(styles.empty, className)}>
      {children ?? 'No results found.'}
    </CommandPrimitive.Empty>
  )
}

function Group({
  heading,
  children,
  className,
}: {
  heading?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <CommandPrimitive.Group
      heading={heading}
      className={cn(styles.group, className)}
    >
      {children}
    </CommandPrimitive.Group>
  )
}

function ComboboxLabel({
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

function Item({
  value: itemValue,
  icon: Icon,
  disabled,
  children,
  className,
  ...props
}: {
  value: string
  icon?: IconProp
  disabled?: boolean
  children: React.ReactNode
  className?: string
} & Omit<
  React.ComponentProps<typeof CommandPrimitive.Item>,
  'onSelect' | 'value'
>) {
  const { value, onSelect, multiple } = useCombobox()
  const isSelected = multiple
    ? (value as string[]).includes(itemValue)
    : value === itemValue

  return (
    <CommandPrimitive.Item
      value={itemValue}
      disabled={disabled}
      onSelect={() => onSelect(itemValue)}
      className={cn(styles.item, className)}
      {...props}
    >
      {Icon && (React.isValidElement(Icon) ? Icon : <Icon className="w-4 h-4" />)}
      {children}
      {isSelected && (
        <Check className={styles.icon} />
      )}
    </CommandPrimitive.Item>
  )
}

function ComboboxSeparator({
  className,
}: {
  className?: string
}) {
  return (
    <CommandPrimitive.Separator className={cn(styles.separator, className)} />
  )
}

const Ctx = React.createContext<ComboboxCtx | null>(null)

function useCombobox() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Combobox compound used outside <Combobox>')
  return ctx
}

export const Combobox = Object.assign(ComboboxRoot, {
  Trigger,
  Content,
  Empty,
  Group,
  Label: ComboboxLabel,
  Item,
  Separator: ComboboxSeparator,
})
`