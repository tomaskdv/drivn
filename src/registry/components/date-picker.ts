export const datePicker = `'use client'

import * as React from 'react'
import { CalendarDays } from 'lucide-react'
import { cn } from '@/utils/cn'
import {
  Calendar,
  type CalendarVariant,
  type DateRange,
  type Locale,
} from '@/components/ui/calendar'

const styles = {
  base: 'relative',
  trigger: cn(
    'flex items-center gap-2 w-full h-10 px-3',
    'border border-input rounded-[10px] text-sm',
    'text-foreground transition-colors cursor-pointer',
    'focus:outline-none',
    'disabled:opacity-50 disabled:cursor-default'
  ),
  placeholder: 'text-muted-foreground',
  icon: 'w-4 h-4 text-muted-foreground shrink-0',
  text: 'flex-1 truncate text-left',
  content: cn(
    'absolute top-full left-0 mt-1 z-50',
    'transition-[opacity,scale] duration-150 ease-out'
  ),
}

type FormatDateFn = (date: Date) => string

interface DatePickerBaseProps {
  placeholder?: string
  formatDate?: FormatDateFn
  disabled?: boolean
  locale?: Partial<Locale>
  defaultMonth?: Date
  className?: string
}

interface DatePickerProps extends DatePickerBaseProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  variant?: CalendarVariant
  fromYear?: number
  toYear?: number
}

interface DatePickerRangeProps extends DatePickerBaseProps {
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}

function formatRangeLabel(
  range: DateRange,
  fmt: FormatDateFn
): string {
  if (!range.from) return ''
  if (!range.to) return fmt(range.from)
  return \\\`\\\${fmt(range.from)} – \\\${fmt(range.to)}\\\`
}

function DatePickerRoot({
  selected,
  onSelect,
  placeholder = 'Pick a date',
  formatDate,
  disabled = false,
  locale,
  variant = 'default',
  fromYear,
  toYear,
  defaultMonth,
  className,
}: DatePickerProps) {
  const fmt = formatDate ?? ((d: Date) =>
    d.toLocaleDateString(locale?.code ?? 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }))
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleSelect = React.useCallback(
    (date: Date | undefined) => {
      onSelect?.(date)
      setOpen(false)
    },
    [onSelect]
  )

  return (
    <div ref={ref} className={cn(styles.base, className)}>
      <button
        type="button"
        className={styles.trigger}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
      >
        <CalendarDays className={styles.icon} />
        <span className={cn(styles.text, !selected && styles.placeholder)}>
          {selected ? fmt(selected) : placeholder}
        </span>
      </button>
      <div className={cn(styles.content, open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none')}>
        <Calendar
          variant={variant}
          locale={locale}
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={defaultMonth ?? selected}
          {...(fromYear !== undefined && { fromYear })}
          {...(toYear !== undefined && { toYear })}
        />
      </div>
    </div>
  )
}

function Range({
  selected,
  onSelect,
  placeholder = 'Pick a date range',
  formatDate,
  disabled = false,
  locale,
  defaultMonth,
  className,
}: DatePickerRangeProps) {
  const fmt = formatDate ?? ((d: Date) =>
    d.toLocaleDateString(locale?.code ?? 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }))
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleSelect = React.useCallback(
    (range: DateRange | undefined) => {
      onSelect?.(range)
      const complete = range?.from && range?.to
        && range.from.getTime() !== range.to.getTime()
      if (complete) setOpen(false)
    },
    [onSelect]
  )

  const label = selected
    ? formatRangeLabel(selected, fmt)
    : undefined

  return (
    <div ref={ref} className={cn(styles.base, className)}>
      <button
        type="button"
        className={styles.trigger}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
      >
        <CalendarDays className={styles.icon} />
        <span className={cn(styles.text, !label && styles.placeholder)}>
          {label ?? placeholder}
        </span>
      </button>
      <div className={cn(styles.content, open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none')}>
        <Calendar.Range
          locale={locale}
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={defaultMonth ?? selected?.from}
        />
      </div>
    </div>
  )
}

export { type DateRange, type Locale }

export const DatePicker = Object.assign(DatePickerRoot, {
  Range,
})
`