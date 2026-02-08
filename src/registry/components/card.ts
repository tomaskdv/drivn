export const card = `import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'bg-card border border-border rounded-[20px]',
    'overflow-hidden transition-all duration-200'
  ),
  hover: 'hover:bg-accent hover:border-border hover:-translate-y-1',
  preview: cn(
    'h-[140px] flex items-center justify-center',
    'border-b border-border p-6',
    'bg-[radial-gradient(ellipse_at_50%_50%,hsl(239_84%_67%_/_0.08)_0%,transparent_70%)]'
  ),
  info: 'p-5 flex justify-between items-center',
}

function CardRoot({
  hover = true,
  className,
  children,
}: {
  hover?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(styles.base, hover && styles.hover, className)}
    >
      {children}
    </div>
  )
}

function Preview({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn(styles.preview, className)}>
      {children}
    </div>
  )
}

function Info({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn(styles.info, className)}>
      {children}
    </div>
  )
}

export const Card = Object.assign(CardRoot, {
  Preview,
  Info,
})
`
