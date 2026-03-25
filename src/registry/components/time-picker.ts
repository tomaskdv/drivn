export const timePicker = `'use client'

import * as React from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Popover } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

const styles = {
  base: 'relative block max-w-xs',
  trigger: cn(
    'flex items-center gap-2 w-full h-10 px-3',
    'border border-input rounded-[10px] text-sm',
    'text-foreground transition-colors',
    'font-normal hover:scale-100',
    'focus:outline-none',
    'disabled:opacity-50 disabled:cursor-default'
  ),
  placeholder: 'text-muted-foreground',
  icon: 'w-4 h-4 text-muted-foreground shrink-0',
  text: 'flex-1 truncate text-left',
  content: 'p-2',
  columns: 'flex gap-1',
  column: cn(
    'flex flex-col items-center',
    'h-[220px] overflow-y-auto px-1',
    '[&::-webkit-scrollbar]:w-1',
    '[&::-webkit-scrollbar-thumb]:rounded-full',
    '[&::-webkit-scrollbar-thumb]:bg-border',
    '[&::-webkit-scrollbar-track]:bg-transparent'
  ),
  columnLabel: cn(
    'text-xs font-medium text-muted-foreground',
    'pb-1'
  ),
  cell: cn(
    'flex items-center justify-center w-14 h-12',
    'text-base rounded-lg hover:bg-accent',
    'transition-colors cursor-pointer'
  ),
  cellActive: cn(
    'bg-foreground text-background font-medium',
    'hover:bg-foreground hover:text-background'
  ),
  period: 'flex flex-col gap-0.5 pt-5 pl-1',
  periodBtn: cn(
    'flex items-center justify-center w-14 h-12',
    'text-xs font-medium rounded-lg',
    'hover:bg-accent transition-colors cursor-pointer'
  ),
}

interface TimePickerProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  format?: '12h' | '24h'
  showSeconds?: boolean
  placeholder?: string
  formatTime?: (date: Date) => string
  disabled?: boolean
  className?: string
}

function to24(v: number, period: 'AM' | 'PM' | undefined) {
  if (!period) return v
  if (period === 'AM') return v === 12 ? 0 : v
  return v === 12 ? 12 : v + 12
}

function Column({
  items,
  selected,
  onSelect,
  label,
}: {
  items: number[]
  selected: number | undefined
  onSelect: (v: number) => void
  label: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const col = ref.current
    const el = col?.querySelector('[data-selected]') as HTMLElement | null
    if (!col || !el) return
    col.scrollTop = el.offsetTop - col.offsetTop - col.clientHeight / 2 + el.clientHeight / 2
  }, [selected])

  return (
    <div className="flex flex-col items-center">
      <span className={styles.columnLabel}>{label}</span>
      <div ref={ref} className={styles.column}>
        {items.map((v) => (
          <button
            key={v}
            type="button"
            data-selected={v === selected || undefined}
            className={cn(
              styles.cell,
              v === selected && styles.cellActive
            )}
            onClick={() => onSelect(v)}
          >
            {String(v).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  )
}

function TimePickerRoot({
  selected,
  onSelect,
  format = '24h',
  showSeconds = false,
  placeholder = 'Pick a time',
  formatTime,
  disabled = false,
  className,
}: TimePickerProps) {
  const is12 = format === '12h'
  const h = selected?.getHours()
  const m = selected?.getMinutes()
  const s = selected?.getSeconds()
  const period = h !== undefined ? (h >= 12 ? 'PM' : 'AM') : undefined
  const h12 = h !== undefined ? (h % 12 || 12) : undefined
  const hours = is12 ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i)
  const values = Array.from({ length: 60 }, (_, i) => i)

  return (
    <Popover className={cn(styles.base, className)}>
      <Popover.Trigger disabled={disabled} className={styles.trigger}>
        <Clock className={styles.icon} />
        <span className={cn(styles.text, !selected && styles.placeholder)}>
          {selected ? (formatTime?.(selected) ?? selected.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', ...(showSeconds && { second: '2-digit' }), hour12: is12 })) : placeholder}
        </span>
      </Popover.Trigger>
      <Popover.Content className={styles.content}>
        <div className={styles.columns}>
          <Column
            label="Hr"
            items={hours}
            selected={is12 ? h12 : h}
            onSelect={(v) =>
              onSelect?.(new Date(0, 0, 0, is12 ? to24(v, period) : v, m ?? 0, s ?? 0))
            }
          />
          <Column
            label="Min"
            items={values}
            selected={m}
            onSelect={(v) =>
              onSelect?.(new Date(0, 0, 0, h ?? 0, v, s ?? 0))
            }
          />
          {showSeconds && (
            <Column
              label="Sec"
              items={values}
              selected={s}
              onSelect={(v) =>
                onSelect?.(new Date(0, 0, 0, h ?? 0, m ?? 0, v))
              }
            />
          )}
          {is12 && (
            <div className={styles.period}>
              {(['AM', 'PM'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={cn(
                    styles.periodBtn,
                    period === p && styles.cellActive
                  )}
                  onClick={() => onSelect?.(new Date(0, 0, 0, to24(h12 ?? 12, p), m ?? 0, s ?? 0))}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </Popover.Content>
    </Popover>
  )
}

function TimePickerInput({
  selected,
  onSelect,
  className,
  ...props
}: Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'value' | 'onSelect'
> & {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}) {
  const value = selected ? String(selected.getHours()).padStart(2, '0') + ':' + String(selected.getMinutes()).padStart(2, '0') : ''

  return (
    <Input
      type="time"
      value={value}
      onChange={(e) => {
        const v = (e.target as HTMLInputElement).value
        if (!v) return onSelect?.(undefined)
        const [h, m] = v.split(':').map(Number)
        onSelect?.(new Date(0, 0, 0, h, m))
      }}
      className={className}
      {...props}
    />
  )
}

export const TimePicker = Object.assign(TimePickerRoot, {
  Input: TimePickerInput
})
`