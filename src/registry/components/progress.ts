export const progress = `import { cn } from '@/utils/cn'

const styles = {
  track: cn(
    'w-full h-2 bg-accent rounded-full overflow-hidden'
  ),
  bar: cn(
    'h-full bg-primary rounded-full',
    'transition-all duration-300 ease-out'
  ),
}

interface ProgressProps {
  value?: number
  max?: number
  className?: string
}

export function Progress({
  value = 0,
  max = 100,
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(styles.track, className)}
    >
      <div
        className={styles.bar}
        style={{ width: \`\${pct}%\` }}
      />
    </div>
  )
}
`
