'use client'

import * as React from 'react'
import {ReactNode, useMemo} from 'react'
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

export interface HeadCell<T> {
  disablePadding?: boolean
  id: keyof T
  label: string
  numeric?: boolean
  render?: (id: keyof T, value: T) => ReactNode
}

export interface Action {
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

interface EnhancedTableProps<T extends {id: string}> {
  title?: string
  dense?: boolean
  headCells: readonly HeadCell<T>[]
  rows?: T[]
  actions: readonly Action[]
  sorting?: Sorting<T>
  paginating: Paginating
  selecting: Selecting
}

export default function EnhancedTable<T extends {id: string}>({
  title = '',
  dense,
  headCells,
  actions,
  rows,
  sorting,
  paginating,
  selecting
}: EnhancedTableProps<T>) {
  const handleSort = (_: React.MouseEvent<unknown>, property: keyof T) => {
    const isAsc = sorting?.orderBy === property && sorting?.order === 'asc'
    const newOrder: Order = isAsc ? 'desc' : 'asc'
    sorting?.onOrderChange?.(newOrder, property)
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    if (paginating?.onPageChange) {
      paginating.onPageChange(newPage)
    }
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (paginating?.onRowsPerPageChange) {
      paginating.onRowsPerPageChange?.(parseInt(event.target.value, 10))
    }
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelected =
      event.target.checked && rows ? rows.map((n) => n.id) : []
    if (selecting?.onSelectedChange) {
      selecting.onSelectedChange?.(newSelected)
    }
  }

  const handleSelect = (_: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selecting?.selected.indexOf(id)
    let newSelected: readonly string[]

    if (selectedIndex === -1) newSelected = selecting?.selected.concat(id)
    else if (selectedIndex === 0) newSelected = selecting?.selected.slice(1)
    else if (selectedIndex === selecting?.selected.length - 1)
      newSelected = selecting?.selected.slice(0, -1)
    else
      newSelected = selecting?.selected
        .slice(0, selectedIndex)
        .concat(selecting?.selected.slice(selectedIndex + 1))

    if (selecting?.onSelectedChange) {
      selecting.onSelectedChange?.(newSelected)
    }
  }

  const currentCount = paginating?.count ?? rows?.length ?? 0

  const currentRows = useMemo(() => {
    return rows
  }, [rows])

  const emptyRows = Math.max(
    0,
    paginating?.rowsPerPage && currentRows
      ? paginating?.rowsPerPage - currentRows.length
      : 0
  )

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <EnhancedTableToolbar
          title={title}
          actions={actions}
          selected={selecting?.selected}
          numSelected={selecting?.selected.length}
        />
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selecting?.selected.length}
              order={sorting?.order ?? 'asc'}
              orderBy={sorting?.orderBy ?? 'id'}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleSort}
              rowCount={currentCount}
              headCells={headCells}
            />
            <TableBody>
              {currentRows?.map((row) => {
                const isItemSelected = selecting?.selected.includes(row.id)
                return (
                  <TableRow
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleSelect(event, row.id)}
                      />
                    </TableCell>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={String(headCell.id)}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                      >
                        {headCell.render
                          ? headCell.render(headCell.id, row)
                          : String(row[headCell.id])}
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
          rowsPerPage={paginating?.rowsPerPage}
          page={paginating?.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

type Order = 'asc' | 'desc'
