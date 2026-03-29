export const dataTable = `'use client'

import * as React from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Table } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { Pagination } from '@/components/ui/pagination'

const styles = {
  root: 'space-y-4',
  sortButton: 'inline-flex items-center gap-1 cursor-pointer select-none',
  sortIcon: 'w-3.5 h-3.5 text-muted-foreground',
  sortIconActive: 'text-foreground',
  selectCell: 'w-10',
  rowSelected: 'bg-primary/5',
  empty: 'py-12 text-center text-sm text-muted-foreground',
  skeleton: 'h-4 rounded',
  pagination: 'flex items-center justify-between',
}

type Row = Record<string, unknown>

interface Sort {
  id: string
  direction: 'asc' | 'desc'
}

interface ColumnDef<T> {
  id: string
  header: string
  cell?: (value: unknown, row: T) => React.ReactNode
  align?: 'left' | 'center' | 'right'
  width?: string
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  rowKey: string
  variant?: 'default' | 'striped' | 'bordered'
  sortable?: boolean
  onSortChange?: (sort: Sort) => void
  selectable?: boolean
  onSelectionChange?: (keys: Set<string>) => void
  loading?: boolean
  toolbar?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

interface DataTablePaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  className?: string
}

function DataTableRoot<T>({
  data,
  columns,
  rowKey,
  variant = 'default',
  sortable = false,
  onSortChange,
  selectable = false,
  onSelectionChange,
  loading = false,
  toolbar,
  footer,
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<Sort | null>(null)
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const ref = React.useRef<HTMLInputElement>(null)

  const sorted = React.useMemo(() => {
    if (!sort) return data
    const col = columns.find(c => c.id === sort.id)
    if (!col) return data
    const m = sort.direction === 'asc' ? 1 : -1
    return [...data].sort((a, b) => {
      const x = (a as Row)[col.id], y = (b as Row)[col.id]
      if (x == null) return 1
      if (y == null) return -1
      return (typeof x === 'number' && typeof y === 'number'
        ? x - y : String(x).localeCompare(String(y))) * m
    })
  }, [data, sort, columns])

  const keys = React.useMemo(() => sorted.map(r => \`\${(r as Row)[rowKey]}\`), [sorted, rowKey])
  const allSelected = keys.length > 0 && keys.every(k => selected.has(k))

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = keys.some(k => selected.has(k)) && !allSelected
    }
  }, [selected, keys, allSelected])

  function onSort(id: string) {
    const next: Sort | null = sort?.id !== id
      ? { id, direction: 'asc' }
      : sort.direction === 'asc'
        ? { id, direction: 'desc' }
        : null
    setSort(next)
    if (next) onSortChange?.(next)
  }

  function setSelection(next: Set<string>) {
    setSelected(next)
    onSelectionChange?.(next)
  }

  function toggle(k: string) {
    const next = new Set(selected)
    if (next.has(k)) next.delete(k)
    else next.add(k)
    setSelection(next)
  }

  return (
    <div className={cn(styles.root, className)}>
      {toolbar}
      <Table variant={variant}>
        <Table.Header>
          <Table.Row>
            {selectable && (
              <Table.Head className={styles.selectCell}>
                <Checkbox
                  ref={ref}
                  checked={allSelected}
                  onChange={() => setSelection(allSelected ? new Set() : new Set(keys))}
                />
              </Table.Head>
            )}
            {columns.map(col => {
              const active = sort?.id === col.id
              const Icon = active
                ? sort.direction === 'asc' ? ArrowUp : ArrowDown
                : ArrowUpDown
              return (
                <Table.Head
                  key={col.id}
                  align={col.align}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {(col.sortable ?? sortable) ? (
                    <button className={styles.sortButton} onClick={() => onSort(col.id)}>
                      {col.header}
                      <Icon className={cn(styles.sortIcon, active && styles.sortIconActive)} />
                    </button>
                  ) : (
                    col.header
                  )}
                </Table.Head>
              )
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loading ? (
            Array.from({ length: 5 }, (_, i) => (
              <Table.Row key={i}>
                {columns.map(col => (
                  <Table.Cell key={col.id}>
                    <Skeleton className={styles.skeleton} style={{ width: col.width ?? '60%' }} />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : sorted.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={columns.length + (selectable ? 1 : 0)}>
                <div className={styles.empty}>No results.</div>
              </Table.Cell>
            </Table.Row>
          ) : (
            sorted.map(r => {
              const k = \`\${(r as Row)[rowKey]}\`
              return (
                <Table.Row
                  key={k}
                  className={selected.has(k) ? styles.rowSelected : undefined}
                >
                  {selectable && (
                    <Table.Cell className={styles.selectCell}>
                      <Checkbox checked={selected.has(k)} onChange={() => toggle(k)} />
                    </Table.Cell>
                  )}
                  {columns.map(col => {
                    const v = (r as Row)[col.id]
                    return (
                      <Table.Cell key={col.id} align={col.align}>
                        {col.cell ? col.cell(v, r) : String(v ?? '')}
                      </Table.Cell>
                    )
                  })}
                </Table.Row>
              )
            })
          )}
        </Table.Body>
      </Table>
      {footer}
    </div>
  )
}

function DataTablePagination({
  page,
  pageCount,
  onPageChange,
  className,
}: DataTablePaginationProps) {
  return (
    <div className={cn(styles.pagination, className)}>
      <span className="text-sm text-muted-foreground">
        Page {page} of {pageCount}
      </span>
      <Pagination className="mx-0 w-auto justify-end">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous
              onClick={(e) => {
                e.preventDefault()
                if (page > 1) onPageChange(page - 1)
              }}
              aria-disabled={page <= 1}
            />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next
              onClick={(e) => {
                e.preventDefault()
                if (page < pageCount) onPageChange(page + 1)
              }}
              aria-disabled={page >= pageCount}
            />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  )
}

export const DataTable = Object.assign(DataTableRoot, {
  Pagination: DataTablePagination
})
`