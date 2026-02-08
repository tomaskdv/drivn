import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node18',
  clean: true,
  minify: true,
  treeshake: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
})
