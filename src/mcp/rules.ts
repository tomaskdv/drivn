export const drivnRules = `# Drivn Component Conventions

## Core Philosophy
- **Zero runtime UI deps** — No Radix, no cva, no external UI primitives. Pure React + Tailwind.
- **Copy & own** — Components live in user's codebase. Full control after install.

## Import Convention
\`\`\`tsx
import * as React from 'react'
\`\`\`
One import, full access to all React APIs via \`React.*\` prefix.

## Dot Notation API
Use compound sub-components via dot notation:
\`\`\`tsx
// Correct
<Dialog.Content>
  <Dialog.Header>
    <Dialog.Title>Title</Dialog.Title>
  </Dialog.Header>
</Dialog.Content>

// Wrong — never use flat names
<DialogContent>
  <DialogHeader>
    <DialogTitle>Title</DialogTitle>
  </DialogHeader>
</DialogContent>
\`\`\`

## const styles Pattern
All classes live in a \`const styles\` object at the top of the file, never inline in JSX:
\`\`\`tsx
const styles = {
  base: cn(
    'inline-flex items-center justify-center',
    'rounded-lg font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2'
  ),
  sizes: {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
  },
  variants: {
    default: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-muted text-foreground hover:bg-muted/80',
    outline: 'border border-border bg-transparent hover:bg-muted/50',
    destructive: 'bg-destructive text-white hover:bg-destructive/90',
  },
}
\`\`\`

## Type-Safe Variants
Use \`keyof typeof\` for autocomplete, no magic strings:
\`\`\`tsx
interface ButtonProps {
  variant?: keyof typeof styles.variants
  size?: keyof typeof styles.sizes
}
\`\`\`

## Icon Props
Pass component references, not JSX elements:
\`\`\`tsx
// Correct
<Button leftIcon={Plus}>Add</Button>

// Wrong
<Button leftIcon={<Plus />}>Add</Button>
\`\`\`

## Class Merging
Use the \`cn()\` utility from \`@/utils/cn\`:
\`\`\`tsx
import { cn } from '@/utils/cn'
// cn is clsx + tailwind-merge
\`\`\`

## Component Categories

### Simple Components (Button, Badge, Input)
- Single file, direct props, \`const styles\` object
- Form elements use \`React.forwardRef\`

### Compound Components (Dialog, Tabs, Dropdown)
- Dot notation API with context
- Parent manages state, children consume via context
- Export pattern: \`const Dialog = Object.assign(DialogRoot, { Content, Header, ... })\`

### Form Components (Input, Textarea, Select)
- Always use \`React.forwardRef\` for ref forwarding
- Support \`className\` override via \`cn()\`

## Color System
- HSL custom properties for all colors
- Theme switching via \`data-theme\` attribute (not \`class\`)
- Never use hardcoded hex/rgba — always reference design tokens
- Tokens: \`--background\`, \`--foreground\`, \`--primary\`, \`--muted\`, \`--border\`, \`--accent\`, etc.
- Tailwind usage: \`bg-primary\`, \`text-foreground\`, \`border-border\`

## File Naming
- kebab-case: \`date-picker.tsx\`, \`radio-group.tsx\`
- Import from: \`@/components/ui/{name}\`

## Line Width
- 80 character lines maximum
- Every component should fit on screen without horizontal scrolling

## Dependencies
- Components declare internal deps (other Drivn components)
- Some components need npm packages (react-day-picker, cmdk, embla-carousel-react, sonner, recharts)
- The CLI resolves and installs all dependencies automatically
`
