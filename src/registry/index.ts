import { button } from './components/button.js'

export interface RegistryEntry {
  name: string
  description: string
  dependencies: string[]
  npmDependencies: string[]
}

export const registry: RegistryEntry[] = [
  {
    name: 'button',
    description: 'Button with variants, sizes, loading state, and type support',
    dependencies: [],
    npmDependencies: [],
  },
]

export type ComponentName = 'button'

export const components: Record<ComponentName, string> = {
  button,
}
