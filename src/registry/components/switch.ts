export const switch_ = `'use client'

import { cn } from '@/utils/cn'

const styles = {
  base: 'relative w-12 h-[26px] rounded-full transition-colors duration-200 overflow-hidden',
  thumb: 'absolute left-0 top-[3px] w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200',
}

interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function Switch({ checked = false, onChange, className }: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={cn(styles.base, checked ? 'bg-primary' : 'bg-border', className)}
    >
      <span className={cn(styles.thumb, checked ? 'translate-x-[25px]' : 'translate-x-[3px]')} />
    </button>
  )
}
`
