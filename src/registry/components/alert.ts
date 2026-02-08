export const alert = `import { cn } from '@/utils/cn'

const styles = {
  base: 'flex gap-3 p-4 rounded-[10px] border text-sm',
  variants: {
    default: 'bg-accent/50 border-border text-foreground',
    info: 'bg-primary/10 border-primary/20 text-primary-light',
    success: 'bg-success/10 border-success/20 text-success',
    destructive: 'bg-destructive/10 border-destructive/20 text-destructive',
  },
  title: 'font-semibold mb-1',
  description: 'text-sm opacity-90',
}

interface AlertProps {
  variant?: keyof typeof styles.variants
  icon?: React.ReactNode
  title?: string
  className?: string
  children: React.ReactNode
}

export function Alert({
  variant = 'default',
  icon,
  title,
  className,
  children,
}: AlertProps) {
  return (
    <div className={cn(styles.base, styles.variants[variant], className)}>
      {icon && <span className="flex-shrink-0 mt-0.5">{icon}</span>}
      <div>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.description}>{children}</div>
      </div>
    </div>
  )
}
`
