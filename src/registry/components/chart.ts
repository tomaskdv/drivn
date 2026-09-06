export const chart = `'use client'

import * as React from 'react'
import {
  CartesianGrid,
  Legend as RechartsLegend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis as RechartsXAxis,
  type DefaultLegendContentProps,
  type TooltipContentProps as RechartsTooltipContentProps,
} from 'recharts'
import { cn } from '@/utils/cn'

type ChartConfig = Record<string, {
  label?: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  color?: string
}>

const styles = {
  root: cn(
    'flex justify-center w-full aspect-video min-h-[200px] text-xs',
    '[&_.recharts-cartesian-grid_line]:stroke-border',
    '[&_.recharts-cartesian-axis-line]:stroke-border',
    '[&_.recharts-cartesian-axis-tick_line]:stroke-border',
    '[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground',
    '[&_.recharts-sector]:stroke-transparent',
    '[&_.recharts-layer]:outline-none',
    '[&_.recharts-surface]:outline-none'
  ),
  tooltip: {
    base: cn(
      'grid min-w-32 gap-1.5 px-3 py-2 text-xs',
      'rounded-[10px] border border-border bg-card shadow-md'
    ),
    label: 'font-medium text-foreground',
    row: 'flex items-center gap-2',
    dot: 'w-2.5 h-2.5 rounded-[2px] shrink-0',
    line: 'w-0.5 self-stretch rounded-full shrink-0',
    name: 'flex-1 text-muted-foreground',
    value: 'font-mono font-medium tabular-nums text-foreground',
  },
  legend: {
    base: 'flex flex-wrap items-center justify-center gap-4',
    top: 'pb-3',
    bottom: 'pt-3',
    item: 'flex items-center gap-1.5 text-muted-foreground',
    swatch: 'w-2.5 h-2.5 rounded-[2px] shrink-0',
    icon: 'w-3.5 h-3.5',
  },
}

interface ChartCtx {
  config: ChartConfig
}

interface TooltipContentProps
  extends Partial<RechartsTooltipContentProps<number | string, string>> {
  hideLabel?: boolean
  indicator?: 'dot' | 'line'
  className?: string
}

interface LegendContentProps
  extends Pick<DefaultLegendContentProps, 'payload' | 'verticalAlign'> {
  className?: string
}

function ChartRoot({
  config,
  className,
  children,
}: {
  config: ChartConfig
  className?: string
  children: React.ReactElement
}) {
  const vars = Object.fromEntries(
    Object.entries(config)
      .filter(([, v]) => v.color)
      .map(([k, v]) => [\`--color-\${k}\`, v.color])
  ) as React.CSSProperties

  return (
    <Ctx.Provider value={{ config }}>
      <div style={vars} className={cn(styles.root, className)}>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </Ctx.Provider>
  )
}

function Grid(props: React.ComponentProps<typeof CartesianGrid>) {
  return <CartesianGrid vertical={false} {...props} />
}

function XAxis(props: React.ComponentProps<typeof RechartsXAxis>) {
  return <RechartsXAxis tickLine={false} axisLine={false} {...props} />
}

function TooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  indicator = 'dot',
  className,
}: TooltipContentProps) {
  const { config } = useChart()
  if (!active || !payload?.length) return null
  const heading = typeof label === 'string'
    ? config[label]?.label ?? label
    : label
  return (
    <div className={cn(styles.tooltip.base, className)}>
      {!hideLabel && heading != null && (
        <div className={styles.tooltip.label}>{heading}</div>
      )}
      {payload.map((item) => {
        const key = String(item.name ?? item.dataKey)
        const entry = config[key]
        return (
          <div key={key} className={styles.tooltip.row}>
            <span
              className={styles.tooltip[indicator]}
              style={{ background: item.color }}
            />
            <span className={styles.tooltip.name}>
              {entry?.label ?? item.name}
            </span>
            <span className={styles.tooltip.value}>
              {typeof item.value === 'number'
                ? item.value.toLocaleString()
                : item.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function LegendContent({
  payload,
  verticalAlign = 'bottom',
  className,
}: LegendContentProps) {
  const { config } = useChart()
  if (!payload?.length) return null
  return (
    <div
      className={cn(
        styles.legend.base,
        verticalAlign === 'top' ? styles.legend.top : styles.legend.bottom,
        className
      )}
    >
      {payload.map((item) => {
        const key = String(item.value ?? item.dataKey)
        const entry = config[key]
        const Icon = entry?.icon
        return (
          <div key={key} className={styles.legend.item}>
            {Icon ? (
              <Icon className={styles.legend.icon} />
            ) : (
              <span
                className={styles.legend.swatch}
                style={{ background: item.color }}
              />
            )}
            {entry?.label ?? item.value}
          </div>
        )
      })}
    </div>
  )
}

function Tooltip(props: React.ComponentProps<typeof RechartsTooltip>) {
  return (
    <RechartsTooltip
      cursor={false}
      content={<TooltipContent />}
      {...props}
    />
  )
}

function Legend(props: React.ComponentProps<typeof RechartsLegend>) {
  return (
    <RechartsLegend
      verticalAlign="bottom"
      content={<LegendContent />}
      {...props}
    />
  )
}

const Ctx = React.createContext<ChartCtx | null>(null)

function useChart() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Chart.* used outside <Chart>')
  return ctx
}

export type { ChartConfig }

export const Chart = Object.assign(ChartRoot, {
  Grid,
  XAxis,
  Tooltip,
  Legend,
  TooltipContent,
  LegendContent
})
`

export const chartTokens = `
/* Drivn Chart Tokens */
:root {
  --chart-1: hsl(240 6% 10%);
  --chart-2: hsl(240 5% 24%);
  --chart-3: hsl(240 5% 38%);
  --chart-4: hsl(240 4% 52%);
  --chart-5: hsl(240 4% 65%);
}

[data-theme="dark"] {
  --chart-1: hsl(0 0% 98%);
  --chart-2: hsl(0 0% 82%);
  --chart-3: hsl(0 0% 66%);
  --chart-4: hsl(0 0% 50%);
  --chart-5: hsl(0 0% 35%);
}

@theme inline {
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
}
`
