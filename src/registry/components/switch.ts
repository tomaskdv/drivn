export const switch_ = `'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'relative w-12 h-[26px] rounded-full',
    'transition-colors duration-200 overflow-hidden'
  ),
  thumb: cn(
    'absolute left-0 top-[3px] w-5 h-5',
    'bg-white rounded-full shadow-md',
    'transition-transform duration-200'
  ),
}

interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export function Switch({
  checked = false,
  onChange,
  className,
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={cn(styles.base, checked ? 'bg-primary' : 'bg-border', className)}
      {...props}
    >
      <span className={cn(styles.thumb, checked ? 'translate-x-[25px]' : 'translate-x-[3px]')} />
    </button>
  )
}
`
