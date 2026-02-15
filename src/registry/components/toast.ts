export const toast = `'use client'

import * as React from 'react'
import { Toaster as Sonner, toast } from 'sonner'
import {
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  Loader2,
} from 'lucide-react'

function Toaster() {
  return (
    <Sonner
      icons={{
        success: (
          <CheckCircle2 className="w-4 h-4" />
        ),
        info: (
          <Info className="w-4 h-4" />
        ),
        warning: (
          <AlertTriangle className="w-4 h-4" />
        ),
        error: (
          <XCircle className="w-4 h-4" />
        ),
        loading: (
          <Loader2 className="w-4 h-4 animate-spin" />
        ),
      }}
      style={{
          '--normal-bg': 'var(--card)',
          '--normal-text': 'var(--card-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': '12px',
      }}
    />
  )
}

export { Toaster, toast }
`
