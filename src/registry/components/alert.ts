export const alert = `import * as React from 'react'
import { cn } from '@/utils/cn'

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

type IconProp = React.ComponentType<{ className?: string }> | React.ReactElement

interface AlertProps {
  variant?: keyof typeof styles.variants
  icon?: IconProp
  title?: string
  className?: string
  children: React.ReactNode
}

export function Alert({
  variant = 'default',
  icon: Icon,
  title,
  className,
  children,
}: AlertProps) {
  return (
    <div className={cn(styles.base, styles.variants[variant], className)}>
      {Icon && (
        <span className="flex-shrink-0 mt-0.5">
          {React.isValidElement(Icon)
            ? Icon
            : <Icon />}
        </span>
      )}
      <div>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.description}>{children}</div>
      </div>
    </div>
  )
}
`
