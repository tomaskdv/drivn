import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'

const CONFIG_FILE = 'drivn.config.json'

export interface Config {
  framework: string
  typescript: boolean
  paths: {
    components: string
    utils: string
  }
  installed?: string[]
}

export function getConfig(cwd: string): Config | null {
  const configPath = join(cwd, CONFIG_FILE)

  if (!existsSync(configPath)) return null

  return JSON.parse(readFileSync(configPath, 'utf-8'))
}

export function saveConfig(cwd: string, config: Config): void {
  const configPath = join(cwd, CONFIG_FILE)
  writeFileSync(configPath, JSON.stringify(config, null, 2))
}

export function ensureDir(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true })
  }
}

export function writeFile(path: string, content: string): void {
  ensureDir(dirname(path))
  writeFileSync(path, content)
}

export function fileExists(path: string): boolean {
  return existsSync(path)
}
