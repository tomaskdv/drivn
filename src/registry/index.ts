import { globals } from './globals.js'
import { accordion } from './components/accordion.js'
import { alert } from './components/alert.js'
import { avatar } from './components/avatar.js'
import { badge } from './components/badge.js'
import { button } from './components/button.js'
import { card } from './components/card.js'
import { checkbox } from './components/checkbox.js'
import { dialog } from './components/dialog.js'
import { dropdown } from './components/dropdown.js'
import { input } from './components/input.js'
import { popover } from './components/popover.js'
import { progress } from './components/progress.js'
import { select } from './components/select.js'
import { separator } from './components/separator.js'
import { switch_ } from './components/switch.js'
import { tabs } from './components/tabs.js'
import { textarea } from './components/textarea.js'
import { toast } from './components/toast.js'
import { tooltip } from './components/tooltip.js'

export { globals }

export interface RegistryEntry {
  name: string
  description: string
  dependencies: string[]
  npmDependencies: string[]
}

export const registry: RegistryEntry[] = [
  {
    name: 'accordion',
    description: 'Collapsible content sections with dot notation and smooth animation',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'alert',
    description: 'Contextual feedback messages with variants and icons',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'avatar',
    description: 'User avatar with image support and fallback initials',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'badge',
    description: 'Small status indicator with color variants',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'button',
    description: 'Button with variants, sizes, loading state, and icon slots',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'card',
    description: 'Container with dot notation preview and info sub-components',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'checkbox',
    description: 'Checkbox input with label and CSS-only checkmark',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'dialog',
    description: 'Modal dialog with dot notation, overlay, and escape key',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'dropdown',
    description: 'Dropdown menu with dot notation, groups, separators, and click-outside',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'input',
    description: 'Text input with focus ring and disabled state',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'popover',
    description: 'Floating content panel with dot notation and click-outside',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'progress',
    description: 'Progress bar with animated fill and ARIA attributes',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'select',
    description: 'Custom select with dot notation and composable options',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'separator',
    description: 'Visual divider with horizontal and vertical orientation',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'switch',
    description: 'Toggle switch with smooth transition',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'tabs',
    description: 'Tab navigation with dot notation and panel content',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'textarea',
    description: 'Multi-line text input with consistent styling',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'toast',
    description: 'Toast notifications powered by Sonner',
    dependencies: [],
    npmDependencies: ['sonner'],
  },
  {
    name: 'tooltip',
    description: 'Pure CSS tooltip with 4 position options',
    dependencies: [],
    npmDependencies: [],
  },
]

export type ComponentName =
  | 'accordion'
  | 'alert'
  | 'avatar'
  | 'badge'
  | 'button'
  | 'card'
  | 'checkbox'
  | 'dialog'
  | 'dropdown'
  | 'input'
  | 'popover'
  | 'progress'
  | 'select'
  | 'separator'
  | 'switch'
  | 'tabs'
  | 'textarea'
  | 'toast'
  | 'tooltip'

export const components: Record<ComponentName, string> = {
  accordion,
  alert,
  avatar,
  badge,
  button,
  card,
  checkbox,
  dialog,
  dropdown,
  input,
  popover,
  progress,
  select,
  separator,
  switch: switch_,
  tabs,
  textarea,
  toast,
  tooltip,
}
