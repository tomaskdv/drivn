export const slider = `'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: 'relative cursor-pointer touch-none select-none',
  track: 'relative bg-border rounded-full',
  range: 'absolute bg-foreground rounded-full',
  thumb: cn(
    'absolute rounded-full bg-foreground shadow-sm',
    'cursor-grab active:cursor-grabbing'
  ),
  horizontal: {
    base: 'w-full',
    track: 'w-full',
    range: 'inset-y-0 left-0',
    thumb: 'top-1/2 -translate-x-1/2 -translate-y-1/2',
  },
  vertical: {
    base: 'h-48',
    track: 'h-full',
    range: 'inset-x-0 bottom-0',
    thumb: 'left-1/2 -translate-x-1/2 translate-y-1/2',
  },
  sizes: {
    sm: { track: 'h-1', thumb: 'w-3 h-3', vTrack: 'w-1' },
    md: { track: 'h-1.5', thumb: 'w-4 h-4', vTrack: 'w-1.5' },
    lg: { track: 'h-2', thumb: 'w-5 h-5', vTrack: 'w-2' },
  },
  disabled: 'opacity-50 cursor-default pointer-events-none',
}

interface SliderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  orientation?: 'horizontal' | 'vertical'
  onChange?: (value: number) => void
  disabled?: boolean
  size?: keyof typeof styles.sizes
  name?: string
}

function snap(val: number, min: number, step: number) {
  return Math.round((val - min) / step) * step + min
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  onChange,
  disabled,
  size = 'md',
  name,
  className,
  ...props
}, ref) => {
    const [internal, setInternal] = React.useState(defaultValue)
    const isControlled = value !== undefined
    const current = isControlled ? value : internal
    const trackRef = React.useRef<HTMLDivElement>(null)

    const isH = orientation === 'horizontal'
    const s = styles.sizes[size]
    const dir = isH ? styles.horizontal : styles.vertical
    const pct = (Math.min(Math.max(current, min), max) - min) / (max - min) * 100

    function resolve(x: number, y: number) {
      const el = trackRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const ratio = isH
        ? (x - r.left) / r.width
        : 1 - (y - r.top) / r.height
      const raw = min + ratio * (max - min)
      const clamped = Math.min(Math.max(snap(raw, min, step), min), max)
      if (!isControlled) setInternal(clamped)
      onChange?.(clamped)
    }

    function handlePointerDown(e: React.PointerEvent) {
      if (disabled) return
      e.preventDefault()
      resolve(e.clientX, e.clientY)
      const onMove = (ev: PointerEvent) =>
        resolve(ev.clientX, ev.clientY)
      const onUp = () => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onUp)
      }
      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUp)
    }

    return (
      <div
        className={cn(styles.base, dir.base, disabled && styles.disabled, className)}
        {...props}
      >
        <div
          ref={trackRef}
          className={cn(styles.track, dir.track, isH ? s.track : s.vTrack)}
          onPointerDown={handlePointerDown}
        >
          <div
            className={cn(styles.range, dir.range)}
            style={isH ? { width: \`\${pct}%\` } : { height: \`\${pct}%\` }}
          />
          <div
            role="slider"
            aria-valuenow={current}
            aria-valuemin={min}
            aria-valuemax={max}
            className={cn(styles.thumb, dir.thumb, s.thumb, 'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50')}
            style={isH ? { left: \`\${pct}%\` } : { bottom: \`\${pct}%\` }}
          />
        </div>
        <input
          ref={ref}
          type="range"
          name={name}
          value={current}
          min={min}
          max={max}
          step={step}
          className="sr-only"
          tabIndex={-1}
          readOnly
        />
      </div>
    )
  }
)

Slider.displayName = 'Slider'
`