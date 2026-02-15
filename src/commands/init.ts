import * as p from '@clack/prompts'
import pc from 'picocolors'
import { join } from 'path'
import { execSync } from 'child_process'
import { detectFramework, FRAMEWORK_NAMES } from '../utils/framework.js'
import { saveConfig, writeFile, fileExists } from '../utils/config.js'
import { globals } from '../registry/globals.js'

const CN_UTIL = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

const GLOBALS_CANDIDATES = [
  'src/app/globals.css',
  'src/styles/globals.css',
  'src/styles/globals.scss',
  'app/globals.css',
]

function detectGlobalsPath(cwd: string): string | null {
  for (const candidate of GLOBALS_CANDIDATES) {
    if (fileExists(join(cwd, candidate))) return candidate
  }
  return null
}

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
    } as { components: string; utils: string; globals?: string },
    installed: [] as string[],
  }

  const ext = projectInfo.typescript ? 'ts' : 'js'
  const cnPath = join(cwd, paths.utils, `cn.${ext}`)

  if (!fileExists(cnPath)) {
    writeFile(cnPath, CN_UTIL)
  }

  // Generate globals.css with theme tokens
  const existingGlobals = detectGlobalsPath(cwd)

  if (existingGlobals) {
    const addTokens = await p.confirm({
      message: `Found ${pc.cyan(existingGlobals)}. Add Drivn theme tokens?`,
      initialValue: true,
    })

    if (!p.isCancel(addTokens) && addTokens) {
      writeFile(join(cwd, existingGlobals), globals)
      config.paths.globals = existingGlobals
      p.log.success(`Theme tokens written to ${pc.cyan(existingGlobals)}`)
    }
  } else {
    const defaultGlobals = projectInfo.srcDir
      ? 'src/styles/globals.css'
      : 'styles/globals.css'

    const globalsPath = await p.text({
      message: 'Where should the globals CSS file be created?',
      placeholder: defaultGlobals,
      defaultValue: defaultGlobals,
    })

    if (!p.isCancel(globalsPath)) {
      writeFile(join(cwd, globalsPath), globals)
      config.paths.globals = globalsPath
      p.log.success(`Theme tokens written to ${pc.cyan(globalsPath)}`)
    }
  }

  saveConfig(cwd, config)

  const s = p.spinner()
  s.start('Installing dependencies')

  try {
    execSync('npm install clsx tailwind-merge lucide-react', {
      cwd,
      stdio: 'ignore',
    })
    s.stop('Dependencies installed')
  } catch {
    s.stop('Failed to install dependencies')
    p.log.warn('Run manually: npm install clsx tailwind-merge lucide-react')
  }

  p.log.info(`Add components with: ${pc.cyan('npx drivn add button')}`)

  p.outro('Drivn initialized')
}
