'use client'

import * as React from 'react'
import {useMemo} from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import {EnhancedTableToolbar} from '@/components/EnhancedTableToolbar'
import {EnhancedTableHead} from '@/components/EnhancedTableHead'

export type HeadCell<T> = {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
}

interface EnhancedTableProps<T extends {id: string}> {
  title?: string
  rows?: T[]
  headCells: readonly HeadCell<T>[]
  order: 'asc' | 'desc'
  orderBy: keyof T
  dense?: boolean
  count?: number
  page: number
  rowsPerPage: number
  selected: readonly string[]
  onOrderChange?: (order: 'asc' | 'desc', orderBy: keyof T) => void
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
  onSelectedChange?: (selected: readonly string[]) => void
}

export default function EnhancedTable<T extends {id: string}>({
  title = '',
  rows = [],
  headCells,
  order,
  orderBy,
  dense,
  count,
  page,
  rowsPerPage,
  selected,
  onOrderChange,
  onPageChange,
  onRowsPerPageChange,
  onSelectedChange
}: EnhancedTableProps<T>) {
  const handleSort = (_: React.MouseEvent<unknown>, property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc'
    const newOrder: Order = isAsc ? 'desc' : 'asc'
    onOrderChange?.(newOrder, property)
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange?.(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowsPerPageChange?.(parseInt(event.target.value, 10))
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelected = event.target.checked ? rows.map((n) => n.id) : []
    onSelectedChange?.(newSelected)
  }

  const handleSelect = (_: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly string[]

    if (selectedIndex === -1) newSelected = selected.concat(id)
    else if (selectedIndex === 0) newSelected = selected.slice(1)
    else if (selectedIndex === selected.length - 1)
      newSelected = selected.slice(0, -1)
    else
      newSelected = selected
        .slice(0, selectedIndex)
        .concat(selected.slice(selectedIndex + 1))

    onSelectedChange?.(newSelected)
  }

  const currentCount = count ?? rows.length

  const currentRows = useMemo(() => {
    return rows
  }, [rows])

  const emptyRows = Math.max(0, rowsPerPage - currentRows.length)

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {currentRows.map((row) => {
                const isItemSelected = selected.includes(row.id)
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleSelect(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{cursor: 'pointer'}}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                      />
                    </TableCell>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={String(headCell.id)}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                      >
                        {String(row[headCell.id])}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={currentCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

type Order = 'asc' | 'desc'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  const aValue = a[orderBy]
  const bValue = b[orderBy]

  if (typeof bValue === 'number' && typeof aValue === 'number')
    return bValue - aValue
  return String(bValue).localeCompare(String(aValue))
}

export function getComparator<T>(order: Order, orderBy: keyof T) {
  return (a: T, b: T) =>
    order === 'desc'
      ? descendingComparator(a, b, orderBy)
      : -descendingComparator(a, b, orderBy)
}
