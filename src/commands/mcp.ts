import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import {
  StdioServerTransport,
} from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import {
  registry,
  components,
  globalsBase,
  themeTokens,
} from '../registry/index.js'
import type {
  RegistryEntry,
  ComponentName,
} from '../registry/index.js'
import { drivnRules } from '../mcp/rules.js'
import pkg from '../../package.json'

function findEntry(name: string): RegistryEntry | undefined {
  return registry.find((c) => c.name === name)
}

function resolveAllDeps(name: string): string[] {
  const resolved = new Set<string>()
  const resolve = (n: string) => {
    if (resolved.has(n)) return
    const entry = findEntry(n)
    if (!entry) return
    entry.dependencies.forEach((d) => resolve(d))
    resolved.add(n)
  }
  resolve(name)
  resolved.delete(name)
  return [...resolved]
}

export async function mcp() {
  const server = new McpServer({
    name: 'drivn',
    version: pkg.version,
  })

  // --- Tools ---

  server.tool(
    'list_components',
    'List all available Drivn UI components with descriptions',
    {},
    async () => ({
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            registry.map((c) => ({
              name: c.name,
              description: c.description,
            })),
            null,
            2
          ),
        },
      ],
    })
  )

  server.tool(
    'get_component',
    'Get the full source code and metadata for a Drivn component',
    { name: z.string().describe('Component name (e.g. "button", "dialog")') },
    async ({ name }) => {
      const entry = findEntry(name)
      if (!entry) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Component "${name}" not found. Use list_components to see available components.`,
            },
          ],
          isError: true,
        }
      }
      const source = components[name as ComponentName]
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                name: entry.name,
                description: entry.description,
                dependencies: entry.dependencies,
                npmDependencies: entry.npmDependencies,
                source,
              },
              null,
              2
            ),
          },
        ],
      }
    }
  )

  server.tool(
    'get_component_metadata',
    'Get metadata only (no source code) for a Drivn component — useful for planning',
    { name: z.string().describe('Component name') },
    async ({ name }) => {
      const entry = findEntry(name)
      if (!entry) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Component "${name}" not found. Use list_components to see available components.`,
            },
          ],
          isError: true,
        }
      }
      const allDeps = resolveAllDeps(name)
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                name: entry.name,
                description: entry.description,
                dependencies: entry.dependencies,
                npmDependencies: entry.npmDependencies,
                allResolvedDependencies: allDeps,
              },
              null,
              2
            ),
          },
        ],
      }
    }
  )

  server.tool(
    'search_components',
    'Search Drivn components by name or description',
    { query: z.string().describe('Search query') },
    async ({ query }) => {
      const q = query.toLowerCase()
      const results = registry.filter(
        (c) =>
          c.name.includes(q) ||
          c.description.toLowerCase().includes(q)
      )
      return {
        content: [
          {
            type: 'text' as const,
            text: results.length
              ? JSON.stringify(
                  results.map((c) => ({
                    name: c.name,
                    description: c.description,
                  })),
                  null,
                  2
                )
              : `No components matching "${query}".`,
          },
        ],
      }
    }
  )

  server.tool(
    'get_installation_instructions',
    'Get step-by-step installation instructions for one or more components',
    {
      components: z
        .array(z.string())
        .describe('Component names to install'),
      packageManager: z
        .enum(['npm', 'pnpm'])
        .optional()
        .describe('Package manager (default: npm)'),
    },
    async ({ components: names, packageManager }) => {
      const pm = packageManager ?? 'npm'
      const toInstall = new Set<string>()
      const npmDeps = new Set<string>()
      const unknown: string[] = []

      const resolve = (name: string) => {
        if (toInstall.has(name)) return
        const entry = findEntry(name)
        if (!entry) {
          unknown.push(name)
          return
        }
        entry.dependencies.forEach((d) => resolve(d))
        entry.npmDependencies.forEach((d) => npmDeps.add(d))
        toInstall.add(name)
      }

      names.forEach(resolve)

      if (unknown.length) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Unknown components: ${unknown.join(', ')}. Use list_components to see available components.`,
            },
          ],
          isError: true,
        }
      }

      const runPrefix =
        pm === 'pnpm' ? 'pnpm dlx' : 'npx'
      const installPrefix =
        pm === 'pnpm' ? 'pnpm add' : 'npm install'

      const steps: string[] = []
      steps.push(
        `# Install components via CLI\n${runPrefix} drivn@latest add ${[...toInstall].join(' ')}`
      )
      if (npmDeps.size) {
        steps.push(
          `# Install required npm dependencies\n${installPrefix} ${[...npmDeps].join(' ')}`
        )
      }
      steps.push(
        `# Components will be installed to your configured components directory\n# (default: src/components/ui/)`
      )

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                componentsToInstall: [...toInstall],
                npmDependencies: [...npmDeps],
                steps,
              },
              null,
              2
            ),
          },
        ],
      }
    }
  )

  server.tool(
    'get_design_tokens',
    'Get the Drivn CSS design tokens (base globals and theme tokens)',
    {},
    async () => ({
      content: [
        {
          type: 'text' as const,
          text: `/* === Base Globals === */\n${globalsBase}\n\n/* === Theme Tokens === */\n${themeTokens}`,
        },
      ],
    })
  )

  server.tool(
    'get_drivn_rules',
    'Get Drivn coding conventions and component patterns',
    {},
    async () => ({
      content: [
        { type: 'text' as const, text: drivnRules },
      ],
    })
  )

  // --- Resources ---

  server.resource(
    'drivn-rules',
    'drivn://rules',
    { description: 'Drivn coding conventions and component patterns' },
    async () => ({
      contents: [
        {
          uri: 'drivn://rules',
          mimeType: 'text/markdown',
          text: drivnRules,
        },
      ],
    })
  )

  server.resource(
    'drivn-design-tokens',
    'drivn://design-tokens',
    { description: 'Drivn CSS globals and theme tokens' },
    async () => ({
      contents: [
        {
          uri: 'drivn://design-tokens',
          mimeType: 'text/css',
          text: `${globalsBase}\n\n${themeTokens}`,
        },
      ],
    })
  )

  for (const entry of registry) {
    const uri = `drivn://components/${entry.name}`
    server.resource(
      `drivn-component-${entry.name}`,
      uri,
      { description: entry.description },
      async () => ({
        contents: [
          {
            uri,
            mimeType: 'text/plain',
            text: components[entry.name as ComponentName],
          },
        ],
      })
    )
  }

  // --- Start ---

  const transport = new StdioServerTransport()
  await server.connect(transport)
}
