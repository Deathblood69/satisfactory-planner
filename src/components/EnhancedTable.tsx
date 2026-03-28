'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
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
  rows: T[]
  headCells: readonly HeadCell<T>[]
  order: Order
  orderBy?: keyof T
}

export default function EnhancedTable<T extends {id: string}>({
  title = '',
  rows,
  headCells,
  order,
  orderBy
}: EnhancedTableProps<T>) {
  const [currentOrder, setCurrentOrder] = React.useState<Order>(order ?? 'asc')
  const [currentOrderBy, setCurrentOrderBy] = React.useState<keyof T>(
    orderBy ?? 'id'
  )
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = currentOrderBy === property && currentOrder === 'asc'
    setCurrentOrder(isAsc ? 'desc' : 'asc')
    setCurrentOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(rows.map((n) => n.id))
      return
    }
    setSelected([])
  }

  const handleClick = (_: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) newSelected = newSelected.concat(selected, id)
    else if (selectedIndex === 0)
      newSelected = newSelected.concat(selected.slice(1))
    else if (selectedIndex === selected.length - 1)
      newSelected = newSelected.concat(selected.slice(0, -1))
    else if (selectedIndex > 0)
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )

    setSelected(newSelected)
  }

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDense(event.target.checked)

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(currentOrder, currentOrderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [currentOrder, currentOrderBy, page, rowsPerPage, rows]
  )

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
              order={currentOrder}
              orderBy={currentOrderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = selected.includes(row.id)

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={
          <Switch
            checked={dense}
            onChange={handleChangeDense}
          />
        }
        label="Dense padding"
      />
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
