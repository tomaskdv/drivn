import * as p from '@clack/prompts'
import pc from 'picocolors'
import { join } from 'path'
import { execSync } from 'child_process'
import {
  getConfig,
  writeFile,
  readFile,
  fileExists,
} from '../utils/config.js'
import { registry, components, themeTokens } from '../registry/index.js'

export async function add(componentNames: string[]) {
  const cwd = process.cwd()

  p.intro('drivn add')

  const config = getConfig(cwd)

  if (!config) {
    p.log.error('Drivn is not initialized. Run npx drivn@latest create')
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

  // Separate theme from regular components
  const hasTheme = componentNames.includes('theme')
  const regularNames = componentNames.filter((n) => n !== 'theme')

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

  regularNames.forEach(resolveDeps)

  // Add next-themes if theme is requested
  if (hasTheme) {
    npmDeps.add('next-themes')
  }

  const extraDeps = [...toInstall].filter(
    (name) => !regularNames.includes(name)
  )

  if (extraDeps.length) {
    p.log.info(
      `Required dependency: ${extraDeps.join(', ')}`
    )
  }

  const ext = config.typescript ? 'tsx' : 'jsx'
  const componentsDir = join(cwd, config.paths.components)

  // Install regular components
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

  // Handle theme installation
  if (hasTheme) {
    // 1. Write theme-provider component
    const providerPath = join(
      componentsDir,
      `theme-provider.${ext}`
    )

    if (fileExists(providerPath)) {
      const overwrite = await p.confirm({
        message: `theme-provider.${ext} exists. Overwrite?`,
        initialValue: false,
      })

      if (!p.isCancel(overwrite) && overwrite) {
        writeFile(providerPath, components.theme)
        p.log.success(
          `theme-provider → ${config.paths.components}/theme-provider.${ext}`
        )
      } else {
        p.log.warn('Skipped theme-provider')
      }
    } else {
      writeFile(providerPath, components.theme)
      p.log.success(
        `theme-provider → ${config.paths.components}/theme-provider.${ext}`
      )
    }

    // 2. Append dark/light theme tokens to globals
    if (config.paths.globals) {
      const globalsPath = join(cwd, config.paths.globals)

      if (fileExists(globalsPath)) {
        const existing = readFile(globalsPath)

        if (existing.includes('[data-theme="dark"]')) {
          p.log.warn(
            'Theme tokens already exist in globals — skipped'
          )
        } else {
          writeFile(globalsPath, existing + themeTokens)
          p.log.success(
            `Theme tokens appended to ${pc.cyan(config.paths.globals)}`
          )
        }
      } else {
        p.log.warn(
          `Globals file not found at ${config.paths.globals}`
        )
      }
    } else {
      p.log.warn(
        'No globals path in drivn.config.json. Add "globals" to paths'
      )
    }

    // 3. Show numbered setup steps
    const compPath = config.paths.components.replace(
      /^src\//,
      '@/'
    )

    p.log.message('')
    p.log.info(pc.bold('Complete the setup:'))
    p.log.message('')
    p.log.message(pc.bold(`${pc.cyan('1.')} Import ThemeProvider in your root layout:`))
    p.log.message(pc.cyan(`   import { ThemeProvider } from "${compPath}/theme-provider"`))
    p.log.message('')
    p.log.message(pc.bold(`${pc.cyan('2.')} Add suppressHydrationWarning to <html>:`))
    p.log.message(pc.cyan('   <html suppressHydrationWarning>'))
    p.log.message('')
    p.log.message(pc.bold(`${pc.cyan('3.')} Wrap your app with ThemeProvider:`))
    p.log.message(pc.cyan('   <ThemeProvider>'))
    p.log.message(pc.cyan('     {children}'))
    p.log.message(pc.cyan('   </ThemeProvider>'))
    p.log.message('')
  }

  // Install npm dependencies
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
