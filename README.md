<p align="center">
  <a href="https://drivn.com">
    <img src="https://raw.githubusercontent.com/tomaskdv/drivn/main/.github/assets/logo.svg" width="60" height="60" alt="Drivn" />
  </a>
</p>
<p align="center"><strong>Drivn</strong></p>
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
  <a href="https://drivn.com">
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

## License

Licensed under the [MIT License](./LICENSE.md).
