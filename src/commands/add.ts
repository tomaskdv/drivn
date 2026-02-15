import * as p from '@clack/prompts'
import { join } from 'path'
import { execSync } from 'child_process'
import { getConfig, writeFile, fileExists } from '../utils/config.js'
import { registry, components } from '../registry/index.js'

export async function add(componentNames: string[]) {
  const cwd = process.cwd()

  p.intro('drivn add')

  const config = getConfig(cwd)

  if (!config) {
    p.log.error('Drivn is not initialized. Run npx drivn@latest create first.')
    p.outro('Cancelled')
    process.exit(1)
  }

  if (!componentNames || !componentNames.length) {
    const selected = await p.multiselect({
      message: 'Select components to add',
      options: registry.map((c) => ({
        label: c.name,
        hint: c.description,
        value: c.name,
      })),
      required: true,
    })

    if (p.isCancel(selected)) {
      p.cancel('Cancelled')
      process.exit(0)
    }

    componentNames = selected as string[]
  }

  const invalid = componentNames.filter(
    (name) => !registry.find((c) => c.name === name)
  )

  if (invalid.length) {
    p.log.error(`Unknown components: ${invalid.join(', ')}`)
    p.log.info('Available: ' + registry.map((c) => c.name).join(', '))
    p.outro('Cancelled')
    process.exit(1)
  }

  const toInstall = new Set<string>()
  const npmDeps = new Set<string>()

  const resolveDeps = (name: string) => {
    if (toInstall.has(name)) return

    const def = registry.find((c) => c.name === name)
    if (!def) return

    def.dependencies.forEach((dep) => resolveDeps(dep))
    def.npmDependencies?.forEach((dep) => npmDeps.add(dep))

    toInstall.add(name)
  }

  componentNames.forEach(resolveDeps)

  const extraDeps = [...toInstall].filter(
    (name) => !componentNames.includes(name)
  )

  if (extraDeps.length) {
    p.log.info(
      `Required dependency: ${extraDeps.join(', ')}`
    )
  }

  const ext = config.typescript ? 'tsx' : 'jsx'
  const componentsDir = join(cwd, config.paths.components)

  for (const name of toInstall) {
    const filePath = join(componentsDir, `${name}.${ext}`)

    if (fileExists(filePath)) {
      const overwrite = await p.confirm({
        message: `${name}.${ext} exists. Overwrite?`,
        initialValue: false,
      })

      if (p.isCancel(overwrite) || !overwrite) {
        p.log.warn(`Skipped ${name}`)
        continue
      }
    }

    let content = components[name]
    content = content.replace(
      /@\/utils/g,
      `@/${config.paths.utils.replace(/^src\//, '')}`
    )

    writeFile(filePath, content)
    p.log.success(
      `${name} → ${config.paths.components}/${name}.${ext}`
    )
  }

  if (npmDeps.size) {
    const s = p.spinner()
    s.start('Installing packages')

    try {
      execSync(`npm install ${[...npmDeps].join(' ')}`, {
        cwd,
        stdio: 'ignore',
      })
      s.stop('Packages installed')
    } catch {
      s.stop('Failed to install packages')
      p.log.warn(`Run manually: npm install ${[...npmDeps].join(' ')}`)
    }
  }

  p.outro('Done.')
}
