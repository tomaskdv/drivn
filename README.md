<p align="center">
  <a href="https://drivnui.com">
    <img src="https://raw.githubusercontent.com/tomaskdv/drivn/main/.github/assets/logo.svg" width="60" height="60" alt="Drivn" />
  </a>
</p>
<h1 align="center">Drivn</h1>
<h3 align="center">Write less. Build more.</h3>
<p align="center">
  Components with dot notation, smart dependencies, and zero verbosity. Ship faster with cleaner code.
</p>

<br/>

<p align="center">
  <a href="https://www.npmjs.com/package/drivn"><img src="https://img.shields.io/npm/v/drivn?style=flat-square&color=171717&labelColor=171717" alt="npm version" /></a>&nbsp;
  <a href="https://www.npmjs.com/package/drivn"><img src="https://img.shields.io/npm/dm/drivn?style=flat-square&color=171717&labelColor=171717" alt="downloads" /></a>&nbsp;
  <a href="https://github.com/tomaskdv/drivn/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/drivn?style=flat-square&color=171717&labelColor=171717" alt="license" /></a>&nbsp;
  <a href="https://github.com/tomaskdv/drivn"><img src="https://img.shields.io/github/stars/tomaskdv/drivn?style=flat-square&color=171717&labelColor=171717" alt="stars" /></a>
</p>

<br/>

<p align="center">
  <a href="https://drivnui.com">
    <img src="https://raw.githubusercontent.com/tomaskdv/drivn/main/.github/assets/drivn.png" alt="Drivn — Write less. Build more." width="100%" />
  </a>
</p>

## Quick Start

Get up and running in two commands:

```sh
npx drivn@latest create
```

> Detects your framework, sets up utilities, installs dependencies, and adds color tokens.

Then add any component:

```sh
npx drivn add button
```

> Components are copied into your codebase. No node_modules magic — they're yours.

Or browse all components interactively:

```sh
npx drivn add
```

> Opens a multi-select prompt — pick exactly the components you need.

---

## Why Drivn

Most component libraries ask you to learn their abstractions, install their runtime, and work around their opinions. Drivn takes the opposite approach — every component is plain React and Tailwind, copied straight into your project. No wrappers. No lock-in. Nothing between you and the code.

| | What you get |
|---|---|
| **Zero Dependencies** | Pure React + Tailwind. No Radix, no cva, no runtime overhead. |
| **Dot Notation API** | `Dialog.Content`, not `DialogContent`. One import, clean API, fully typed. |
| **`const styles`** | All classes in a styles object. Opens clean, reads clean, diffs clean. |
| **Type-Safe Variants** | `keyof typeof styles.variants` gives autocomplete. No magic strings. |
| **Copy & Own** | Every component lives in your codebase. Full control after install. |

---

## How it looks

```tsx
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function ConfirmDialog() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content title="Confirm action">
        Are you sure you want to continue?
        <Dialog.Footer>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
```

## MCP Server

Connect your AI assistant directly to the Drivn component registry via the [Model Context Protocol](https://modelcontextprotocol.io). Instead of copy-pasting component code into chat, your AI gets exact source code, design tokens, and coding conventions automatically.

### Claude Code

```sh
claude mcp add drivn -- npx drivn@latest mcp
```

### Cursor

```sh
npx @anthropic-ai/cursor-mcp-installer drivn -- npx drivn@latest mcp
```

### Manual configuration

For any MCP-compatible client, add the following to your config file:

```json
{
  "mcpServers": {
    "drivn": {
      "command": "npx",
      "args": ["drivn@latest", "mcp"]
    }
  }
}
```

### Available tools

| Tool | Description |
|---|---|
| `list_components` | List all available components with descriptions |
| `get_component` | Get full source code and metadata for a component |
| `get_component_metadata` | Get metadata only (no source) — useful for planning |
| `search_components` | Search components by name or description |
| `get_installation_instructions` | Get step-by-step install instructions with dependency resolution |
| `get_design_tokens` | Get CSS design tokens (globals and theme tokens) |
| `get_drivn_rules` | Get Drivn coding conventions and component patterns |

---

## License

Licensed under the [MIT License](./LICENSE.md).
