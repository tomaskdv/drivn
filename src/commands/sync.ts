import * as p from '@clack/prompts'
import { join } from 'path'
import { readdirSync } from 'fs'
import { getConfig, saveConfig, writeFile } from '../utils/config.js'
import { registry, components } from '../registry/index.js'

export async function sync() {
  const cwd = process.cwd()

  p.intro('drivn sync')

  const config = getConfig(cwd)

  if (!config) {
    p.log.error('Drivn is not initialized. Run npx drivn init first.')
    p.outro('Cancelled')
    process.exit(1)
  }

  const ext = config.typescript ? 'tsx' : 'jsx'
  const componentsDir = join(cwd, config.paths.components)

  let existingFiles: string[] = []
  try {
    existingFiles = readdirSync(componentsDir).filter(
      (f) => f.endsWith(`.${ext}`)
    )
  } catch {
    p.log.error(`Components directory not found: ${config.paths.components}`)
    p.outro('Cancelled')
    process.exit(1)
  }

  const registryNames = new Set(registry.map((r) => r.name))
  const toSync: string[] = []

  for (const file of existingFiles) {
    const name = file.replace(`.${ext}`, '')
    if (registryNames.has(name)) {
      toSync.push(name)
    }
  }

  if (!toSync.length) {
    p.log.warn('No Drivn components found to sync')
    p.log.info('Add components first: npx drivn add button')
    p.outro('Nothing to sync')
    process.exit(0)
  }

  const s = p.spinner()
  s.start(`Syncing ${toSync.length} components`)

  let updated = 0

  for (const name of toSync) {
    const filePath = join(componentsDir, `${name}.${ext}`)

    if (!components[name]) {
      continue
    }

    let content = components[name]
    content = content.replace(
      /@\/utils/g,
      `@/${config.paths.utils.replace(/^src\//, '')}`
    )

    writeFile(filePath, content)
    updated++
  }

  const installed = new Set(config.installed || [])
  toSync.forEach((name) => installed.add(name))
  saveConfig(cwd, { ...config, installed: [...installed] })

  s.stop(`Synced ${updated} components to latest`)

  p.outro('Done')
}
