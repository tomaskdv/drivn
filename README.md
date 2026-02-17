<p align="center">
  <h1 align="center">Drivn</h1>
</p>

<p align="center">
  Modern UI components for React. Beautiful, accessible, yours.<br/>
  <b>Build more. Write less.</b>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/drivn"><img src="https://img.shields.io/npm/v/drivn?style=flat" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/drivn"><img src="https://img.shields.io/npm/dm/drivn?style=flat" alt="npm downloads" /></a>
  <a href="https://github.com/tomaskdv/drivn/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/drivn?style=flat" alt="license" /></a>
  <a href="https://github.com/tomaskdv/drivn"><img src="https://img.shields.io/github/stars/tomaskdv/drivn?style=flat" alt="GitHub stars" /></a>
</p>

---

## Quick Start

```sh
npx drivn@latest create   # initialize project
npx drivn add button       # add a component
```

---

## Why Drivn

- **Zero UI Dependencies** — Pure React + Tailwind. No Radix, no runtime overhead.
- **Dot Notation** — `Dialog.Content`, not `DialogContent`. One import, clean API.
- **`const styles` Pattern** — All classes in a styles object, never inline in JSX.
- **Type-Safe Variants** — `keyof typeof styles.variants` gives autocomplete.
- **Icon as Component** — `leftIcon={Plus}` not `leftIcon={<Plus />}`.
- **Copy & Own** — Components live in your codebase. Full control after install.

---

## Example

```tsx
import * as React from 'react'
import { cn } from '@/utils/cn'

const styles = {
  base: cn(
    'inline-flex items-center justify-center',
    'font-semibold rounded-lg transition-colors',
  ),
  sizes: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  },
  variants: {
    default: 'bg-foreground text-background hover:bg-foreground/90',
    outline: 'border border-border hover:bg-accent',
  },
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styles.variants
  size?: keyof typeof styles.sizes
}

function Button({ variant = 'default', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(styles.base, styles.sizes[size], styles.variants[variant], className)}
      {...props}
    />
  )
}
```

---

## Components

**20+ components** across 5 categories:

- **Form** — Inputs, selects, checkboxes, toggles, buttons with variants and loading states
- **Layout** — Cards, accordions, separators, tab navigation
- **Overlay** — Modals, dropdowns, popovers, tooltips, toasts
- **Feedback** — Alerts, avatars, badges, progress indicators
- **Theming** — Dark/light mode with one command

Browse all components with `npx drivn add` or visit the docs.

---

React 18+ · Tailwind CSS v4 · TypeScript recommended

[Documentation](https://drivn.dev) · [GitHub](https://github.com/tomaskdv/drivn) · [npm](https://www.npmjs.com/package/drivn) · [MIT License](./LICENSE.md)
