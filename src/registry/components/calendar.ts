export const calendar = `'use client'

import * as React from 'react'
import {
  DayPicker,
  type DateRange,
  type PropsBase,
  type PropsSingle,
  type PropsRange,
} from 'react-day-picker'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  root: 'p-3 bg-card border border-border rounded-[10px] text-sm',
  classNames: {
    months: 'relative flex gap-4',
    month: 'flex flex-col gap-4',
    month_caption: 'flex items-center justify-center h-7',
    caption_label: 'text-sm font-medium text-foreground',
    nav: 'absolute inset-x-0 top-0 flex items-center justify-between h-7',
    button_previous: cn(
      'inline-flex items-center justify-center',
      'w-7 h-7 rounded-md text-muted-foreground',
      'hover:text-foreground hover:bg-accent',
      'transition-colors cursor-pointer'
    ),
    button_next: cn(
      'inline-flex items-center justify-center',
      'w-7 h-7 rounded-md text-muted-foreground',
      'hover:text-foreground hover:bg-accent',
      'transition-colors cursor-pointer'
    ),
    month_grid: 'border-collapse border-spacing-0',
    weekdays: '',
    weekday: cn(
      'w-8 pb-2 text-[0.8rem] font-medium',
      'text-muted-foreground text-center'
    ),
    week: '',
    day: 'p-0 text-center',
    day_button: cn(
      'inline-flex items-center justify-center',
      'w-8 h-8 rounded-md text-sm cursor-pointer',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none'
    ),
    today: 'font-semibold text-primary',
    selected: cn(
      '[&>button]:bg-primary',
      '[&>button]:text-primary-foreground',
      '[&>button]:hover:bg-primary',
      '[&>button]:hover:text-primary-foreground'
    ),
    outside: 'text-muted-foreground/40',
    disabled: 'text-muted-foreground/30 cursor-not-allowed',
    range_middle: cn(
      'bg-accent text-accent-foreground',
      'hover:bg-accent hover:text-accent-foreground',
      'rounded-none [&>button]:rounded-none'
    ),
    chevron: 'w-4 h-4',
    dropdown: cn(
      'appearance-none bg-transparent text-sm',
      'font-medium text-foreground cursor-pointer',
      'border-none outline-none'
    ),
    week_number: cn(
      'w-8 text-[0.75rem]',
      'text-muted-foreground/50 text-center font-normal'
    ),
    hidden: 'invisible',
  },
  dropdownOverrides: {
    dropdowns: 'flex items-center gap-2 justify-center',
    dropdown_root: 'relative inline-flex items-center',
    dropdown: 'absolute inset-0 opacity-0 cursor-pointer w-full z-10',
    caption_label: cn(
      'inline-flex items-center text-sm',
      'font-medium text-foreground',
      'pointer-events-none whitespace-nowrap'
    ),
    chevron: 'w-3 h-3 ml-0.5 text-muted-foreground',
  },
  rangeActive: {
    range_start: cn(
      'bg-primary text-primary-foreground',
      'rounded-l-md [&>button]:rounded-r-none'
    ),
    range_end: cn(
      'bg-primary text-primary-foreground',
      'rounded-r-md [&>button]:rounded-l-none'
    ),
  },
}

const variantConfig = {
  default: {},
  weekNumbers: { showWeekNumber: true },
  dropdown: { captionLayout: 'dropdown' as const },
}

type CalendarVariant = keyof typeof variantConfig

type CalendarProps = Omit<PropsBase, 'mode'> & Omit<PropsSingle, 'mode'> & { variant?: CalendarVariant; fromYear?: number; toYear?: number }

type RangeProps = Omit<PropsBase, 'mode'> & Omit<PropsRange, 'mode'>

function Chevron(props: { orientation?: 'left' | 'right' | 'up' | 'down'; size?: number; disabled?: boolean; className?: string }) {
  const icons = { left: ChevronLeft, right: ChevronRight, down: ChevronDown, up: ChevronRight }
  const Icon = icons[props.orientation ?? 'right']
  return <Icon className={props.className} />
}

const currentYear = new Date().getFullYear()

function CalendarRoot({
  variant = 'default',
  fromYear = currentYear - 20,
  toYear = currentYear + 20,
  className,
  classNames: userClassNames,
  ...props
}: CalendarProps) {
  const dropdownRange = variant === 'dropdown' ? {
    startMonth: new Date(fromYear, 0),
    endMonth: new Date(toYear, 11),
  } : {}

  return (
    <DayPicker
      mode="single"
      {...variantConfig[variant]}
      {...dropdownRange}
      classNames={{
        ...styles.classNames,
        ...(variant === 'dropdown' && styles.dropdownOverrides),
        ...userClassNames,
      }}
      components={{ Chevron }}
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

function Range({
  className,
  classNames: userClassNames,
  selected,
  ...props
}: RangeProps) {
  const hasRange = selected?.from && selected?.to && selected.from.getTime() !== selected.to.getTime()

  return (
    <DayPicker
      mode="range"
      selected={selected}
      classNames={{
        ...styles.classNames,
        ...(hasRange && styles.rangeActive),
        ...userClassNames,
      }}
      components={{ Chevron }}
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

export { type DateRange }

export const Calendar = Object.assign(CalendarRoot, {
  Range
})
`
