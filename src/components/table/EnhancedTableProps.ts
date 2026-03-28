import {ReactNode} from 'react'

interface HeadCell<T> {
  disablePadding?: boolean
  id: keyof T
  label: string
  numeric?: boolean
  render?: (id: keyof T, value: T) => ReactNode
}

interface RowAction<T> {
  id: string
  label: string
  render: (value: T) => ReactNode
}

interface Action {
  id: string
  children: ReactNode
  onClick?: (actionId: string, selected: readonly string[]) => void
}

interface Sorting<T> {
  order: 'asc' | 'desc'
  orderBy: keyof T
  onOrderChange?: (order: 'asc' | 'desc', orderBy: keyof T) => void
}

interface Paginating {
  count?: number
  page: number
  rowsPerPage: number
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
}

interface Selecting {
  selected: readonly string[]
  onSelectedChange?: (selected: readonly string[]) => void
}

export type {HeadCell, RowAction, Action, Sorting, Paginating, Selecting}
