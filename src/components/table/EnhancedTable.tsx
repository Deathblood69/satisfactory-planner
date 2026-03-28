'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import {
  EnhancedTableBody,
  EnhancedTableHead,
  EnhancedTableToolbar
} from './index'
import {
  Action,
  HeadCell,
  Paginating,
  RowAction,
  Selecting,
  Sorting
} from '@/components/table'

interface Props<T extends {id: string}> {
  title?: string
  dense?: boolean
  headCells: readonly HeadCell<T>[]
  rows?: T[]
  rowActions: readonly RowAction<T>[]
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
  rowActions,
  sorting,
  paginating,
  selecting
}: Props<T>) {
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

  const currentCount = paginating?.count ?? rows?.length ?? 0

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
              rowActions={rowActions}
            />
            <EnhancedTableBody
              headCells={headCells}
              rows={rows}
              rowActions={rowActions}
              actions={actions}
              paginating={paginating}
              selecting={selecting}
            />
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
