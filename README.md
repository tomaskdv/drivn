<p align="center">
  <a href="https://drivn.com">
    <img src="https://raw.githubusercontent.com/tomaskdv/drivn/main/.github/assets/logo.svg" width="60" height="60" alt="Drivn" />
  </a>
</p>

<h1 align="center">Drivn</h1>

<p align="center">
  <strong>Write less. Build more.</strong><br/>
  React + Tailwind components with zero runtime deps. Dot notation API. Copied into your codebase.
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
  <a href="https://drivn.com"><b>Docs</b></a>&nbsp;&nbsp;&nbsp;
  <a href="#quick-start">Quick Start</a>&nbsp;&nbsp;&nbsp;
  <a href="#components">Components</a>&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/tomaskdv/drivn">GitHub</a>
</p>

<br/>

<p align="center">
  <a href="https://drivn.com">
    <img src="https://raw.githubusercontent.com/tomaskdv/drivn/main/.github/assets/drivn.png" alt="Drivn — React + Tailwind component library" width="100%" />
  </a>
</p>

---

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

---

## Why Drivn

Most component libraries ask you to learn their abstractions, install their runtime, and work around their opinions. Drivn takes the opposite approach — every component is plain React and Tailwind, copied straight into your project. No wrappers. No lock-in. Nothing between you and the code.

You get components that read like you wrote them, because after install, they're yours.

| | What you get |
|---|---|
| **Zero Dependencies** | Pure React + Tailwind. No Radix, no cva, no runtime overhead. |
| **Dot Notation API** | `Dialog.Content`, not `DialogContent`. One import, clean API, fully typed. |
| **`const styles`** | All classes in a styles object. Opens clean, reads clean, diffs clean. |
| **Type-Safe Variants** | `keyof typeof styles.variants` gives autocomplete. No magic strings. |
| **Icon as Component** | `leftIcon={Plus}` not `leftIcon={<Plus />}`. Zero boilerplate. |
| **Copy & Own** | Every component lives in your codebase. Full control after install. |

---

## How it looks

```tsx
import { Dialog } from '@/components/ui/dialog'

function Example() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content title="Confirm action">
        <p>Are you sure you want to continue?</p>
        <Dialog.Footer>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
```

---

## Components

**20 production-ready components**, all zero-dependency:

| Category | Components |
|---|---|
| **Form** | Button, Input, Textarea, Select, Checkbox, Switch |
| **Layout** | Card, Accordion, Tabs, Separator |
| **Overlay** | Dialog, Dropdown, Popover, Tooltip, Toast |
| **Feedback** | Alert, Avatar, Badge, Progress |
| **Theming** | Theme Provider (dark/light mode) |

```sh
# Browse all components interactively
npx drivn add
```

---

<p align="center">
  <b>Requirements</b><br/>
  React 18+ · Tailwind CSS v4 · TypeScript recommended
</p>

<p align="center">
  <a href="https://drivn.com"><b>Docs</b></a> ·
  <a href="https://github.com/tomaskdv/drivn"><b>GitHub</b></a> ·
  <a href="https://www.npmjs.com/package/drivn"><b>npm</b></a>
</p>

<p align="center">
  <sub>MIT License</sub>
</p>
