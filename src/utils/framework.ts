import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

export type Framework = 'next' | 'react'

export const FRAMEWORK_NAMES: Record<Framework, string> = {
  next: 'Next.js',
  react: 'React',
}

export interface ProjectInfo {
  framework: Framework
  srcDir: boolean
  typescript: boolean
}

export function detectFramework(cwd: string): ProjectInfo {
  const pkgPath = join(cwd, 'package.json')

  if (!existsSync(pkgPath)) {
    throw new Error('package.json not found')
  }

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }

  let framework: Framework = 'react'

  if (deps['next']) framework = 'next'

  const srcDir = existsSync(join(cwd, 'src'))
  const typescript = existsSync(join(cwd, 'tsconfig.json'))

  return { framework, srcDir, typescript }
}
