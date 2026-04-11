import { existsSync } from 'fs'
import { join } from 'path'

export type PackageManager = 'npm' | 'pnpm' | 'yarn'

export function detectPackageManager(
  cwd: string
): PackageManager {
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'
  return 'npm'
}

export function getInstallCommand(
  pm: PackageManager,
  deps: string[]
): string {
  const joined = deps.join(' ')
  if (pm === 'pnpm') return `pnpm add ${joined}`
  if (pm === 'yarn') return `yarn add ${joined}`
  return `npm install ${joined}`
}

export function getRunnerPrefix(
  pm: PackageManager
): string {
  if (pm === 'pnpm') return 'pnpm dlx'
  if (pm === 'yarn') return 'yarn dlx'
  return 'npx'
}
