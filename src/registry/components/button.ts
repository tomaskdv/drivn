export const button = `import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-150 cursor-pointer',
    'disabled:opacity-50 disabled:pointer-events-none'
  ),
  sizes: {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2',
  },
  variants: {
    default: 'bg-foreground text-background hover:scale-[1.02]',
    secondary: 'bg-card text-foreground border border-border hover:bg-accent hover:border-border',
    outline: 'border border-border text-foreground hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  },
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styles.variants
  size?: keyof typeof styles.sizes
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', loading, disabled, leftIcon, rightIcon, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={loading || disabled}
      className={cn(styles.base, styles.sizes[size], styles.variants[variant], className)}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
)

Button.displayName = 'Button'
`
