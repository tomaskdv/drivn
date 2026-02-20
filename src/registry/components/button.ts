export const button = `import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'inline-flex items-center justify-center',
    'font-semibold transition-all duration-150',
    'cursor-pointer disabled:opacity-50',
    'disabled:pointer-events-none'
  ),
  sizes: {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2',
  },
  variants: {
    default: 'bg-foreground text-background hover:scale-[1.02]',
    secondary: cn(
      'bg-card text-foreground border border-border',
      'hover:bg-accent hover:border-border'
    ),
    outline: 'border border-border text-foreground hover:border-foreground/20',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  },
  rounded: {
    md: 'rounded-md',
    full: 'rounded-full',
  },
}

type IconProp = React.ComponentType<{ className?: string }> | React.ReactElement

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styles.variants
  size?: keyof typeof styles.sizes
  rounded?: keyof typeof styles.rounded
  loading?: boolean
  leftIcon?: IconProp
  rightIcon?: IconProp
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant = 'default',
    size = 'md',
    rounded = 'full',
    loading,
    disabled,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    children,
    ...props
  }, ref) => (
    <button
      ref={ref}
      disabled={loading || disabled}
      className={cn(
        styles.base,
        styles.sizes[size],
        styles.variants[variant],
        styles.rounded[rounded],
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      {!loading && LeftIcon && (
        React.isValidElement(LeftIcon)
          ? LeftIcon
          : <LeftIcon />
      )}
      {children}
      {!loading && RightIcon && (
        React.isValidElement(RightIcon)
          ? RightIcon
          : <RightIcon />
      )}
    </button>
  )
)

Button.displayName = 'Button'
`
