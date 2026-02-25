import { globalsBase, themeTokens } from './globals.js'
import { themeProvider } from './components/theme-provider.js'
import { accordion } from './components/accordion.js'
import { alert } from './components/alert.js'
import { avatar } from './components/avatar.js'
import { badge } from './components/badge.js'
import { breadcrumb } from './components/breadcrumb.js'
import { button } from './components/button.js'
import { calendar } from './components/calendar.js'
import { datePicker } from './components/date-picker.js'
import { command } from './components/command.js'
import { carousel } from './components/carousel.js'
import { card } from './components/card.js'
import { checkbox } from './components/checkbox.js'
import { dialog } from './components/dialog.js'
import { dropdown } from './components/dropdown.js'
import { input } from './components/input.js'
import { kbd } from './components/kbd.js'
import { label } from './components/label.js'
import { pagination } from './components/pagination.js'
import { popover } from './components/popover.js'
import { progress } from './components/progress.js'
import { radioGroup } from './components/radio-group.js'
import { select } from './components/select.js'
import { separator } from './components/separator.js'
import { sidebar } from './components/sidebar.js'
import { slider } from './components/slider.js'
import { switch_ } from './components/switch.js'
import { tabs } from './components/tabs.js'
import { textarea } from './components/textarea.js'
import { toast } from './components/toast.js'
import { table } from './components/table.js'
import { tooltip } from './components/tooltip.js'

export { globalsBase, themeTokens, themeProvider }

export const calendarTokens = `
/* react-day-picker theme integration */
.rdp-root {
  --rdp-accent-color: var(--primary);
  --rdp-accent-background-color: var(--accent);
  --rdp-day-height: 36px;
  --rdp-day-width: 36px;
  --rdp-selected-font: inherit;
  --rdp-selected-border: none;
  --rdp-day_button-border: none;
}
`

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
    name: 'breadcrumb',
    description: 'Breadcrumb navigation with auto-separators, ellipsis, and dot notation',
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
    name: 'calendar',
    description: 'Date picker powered by react-day-picker with single, range, and dropdown modes',
    dependencies: [],
    npmDependencies: ['react-day-picker'],
  },
  {
    name: 'date-picker',
    description: 'Date picker input with Calendar dropdown for single date and range selection',
    dependencies: ['calendar'],
    npmDependencies: [],
  },
  {
    name: 'command',
    description: 'Searchable command menu with filtering, keyboard navigation, and dialog mode',
    dependencies: ['dialog'],
    npmDependencies: ['cmdk'],
  },
  {
    name: 'carousel',
    description: 'Carousel with touch/swipe, navigation arrows, dot indicators, and loop mode',
    dependencies: ['button'],
    npmDependencies: ['embla-carousel-react'],
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
    dependencies: ['button'],
    npmDependencies: [],
  },
  {
    name: 'dropdown',
    description: 'Dropdown menu with dot notation, groups, separators, and click-outside',
    dependencies: ['button'],
    npmDependencies: [],
  },
  {
    name: 'input',
    description: 'Text input with focus ring and disabled state',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'kbd',
    description: 'Keyboard key display for shortcuts and hotkeys',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'label',
    description: 'Accessible form label for inputs, checkboxes, and selects',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'pagination',
    description: 'Page navigation with dot notation, Previous/Next, ellipsis, and active state',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'popover',
    description: 'Floating content panel with dot notation and click-outside',
    dependencies: ['button'],
    npmDependencies: [],
  },
  {
    name: 'progress',
    description: 'Progress bar with animated fill and ARIA attributes',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'radio-group',
    description: 'Radio group with dot notation, orientation support, and controlled/uncontrolled selection',
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
    name: 'sidebar',
    description: 'Collapsible sidebar with dot notation, icon items, groups, and layout variants',
    dependencies: [],
    npmDependencies: [],
  },
  {
    name: 'slider',
    description: 'Range slider with pointer drag, step snapping, and size variants',
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
    name: 'table',
    description: 'Data table with dot notation, striped/bordered variants, and responsive overflow',
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
    name: 'theme',
    description: 'Dark/light theme support with next-themes and ThemeProvider',
    dependencies: [],
    npmDependencies: ['next-themes'],
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
  | 'breadcrumb'
  | 'button'
  | 'calendar'
  | 'date-picker'
  | 'command'
  | 'carousel'
  | 'card'
  | 'checkbox'
  | 'dialog'
  | 'dropdown'
  | 'input'
  | 'kbd'
  | 'label'
  | 'pagination'
  | 'popover'
  | 'progress'
  | 'radio-group'
  | 'select'
  | 'separator'
  | 'sidebar'
  | 'slider'
  | 'switch'
  | 'table'
  | 'tabs'
  | 'textarea'
  | 'theme'
  | 'toast'
  | 'tooltip'

export const components: Record<ComponentName, string> = {
  accordion,
  alert,
  avatar,
  badge,
  breadcrumb,
  button,
  calendar,
  'date-picker': datePicker,
  command,
  carousel,
  card,
  checkbox,
  dialog,
  dropdown,
  input,
  kbd,
  label,
  pagination,
  popover,
  progress,
  'radio-group': radioGroup,
  select,
  separator,
  sidebar,
  slider,
  switch: switch_,
  table,
  tabs,
  textarea,
  theme: themeProvider,
  toast,
  tooltip,
}
