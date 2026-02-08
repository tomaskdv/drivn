import * as p from '@clack/prompts'
import pc from 'picocolors'
import { join } from 'path'
import { execSync } from 'child_process'
import { detectFramework, FRAMEWORK_NAMES } from '../utils/framework.js'
import { saveConfig, writeFile, fileExists } from '../utils/config.js'

const CN_UTIL = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

export async function init() {
  const cwd = process.cwd()

  console.log('')
  console.log(pc.bgCyan(pc.bold(pc.black(' Drivn '))))

  let projectInfo
  try {
    projectInfo = detectFramework(cwd)
    p.log.success(`Detected ${pc.cyan(FRAMEWORK_NAMES[projectInfo.framework])}`)
  } catch {
    p.log.error('No package.json found. Run this command in a project directory.')
    p.outro('Setup cancelled')
    process.exit(1)
  }

  if (fileExists(join(cwd, 'drivn.config.json'))) {
    const overwrite = await p.confirm({
      message: 'Config already exists. Overwrite?',
      initialValue: false,
    })

    if (p.isCancel(overwrite) || !overwrite) {
      p.cancel('Setup cancelled')
      process.exit(0)
    }
  }

  const defaultComponents = projectInfo.srcDir
    ? 'src/components/ui'
    : 'components/ui'

  const defaultUtils = projectInfo.srcDir
    ? 'src/utils'
    : 'utils'

  const paths = await p.group(
    {
      components: () =>
        p.text({
          message: 'Where should components be installed?',
          placeholder: defaultComponents,
          defaultValue: defaultComponents,
        }),
      utils: () =>
        p.text({
          message: 'Where should utilities be placed?',
          placeholder: defaultUtils,
          defaultValue: defaultUtils,
        }),
    },
    {
      onCancel: () => {
        p.cancel('Setup cancelled')
        process.exit(0)
      },
    }
  )

  const config = {
    framework: projectInfo.framework,
    typescript: projectInfo.typescript,
    paths: {
      components: paths.components,
      utils: paths.utils,
    },
    installed: [] as string[],
  }

  saveConfig(cwd, config)

  const ext = projectInfo.typescript ? 'ts' : 'js'
  const cnPath = join(cwd, paths.utils, `cn.${ext}`)

  if (!fileExists(cnPath)) {
    writeFile(cnPath, CN_UTIL)
  }

  const s = p.spinner()
  s.start('Installing dependencies')

  try {
    execSync('npm install clsx tailwind-merge', {
      cwd,
      stdio: 'ignore',
    })
    s.stop('Dependencies installed')
  } catch {
    s.stop('Failed to install dependencies')
    p.log.warn('Run manually: npm install clsx tailwind-merge')
  }

  p.log.info(`Add components with: ${pc.cyan('npx drivn add button')}`)

  p.outro('Drivn initialized')
}
