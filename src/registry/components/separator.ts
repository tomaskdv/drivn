export const separator = `import { cn } from '@/utils/cn'

const styles = {
  horizontal: 'w-full h-px bg-border',
  vertical: 'h-full w-px bg-border',
}

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Separator({
  orientation = 'horizontal',
  className,
}: SeparatorProps) {
  return (
    <div
      role="separator"
      className={cn(styles[orientation], className)}
    />
  )
}
`
