'use client'

import * as React from 'react'
import {useMemo} from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import {
  Action,
  HeadCell,
  Paginating,
  RowAction,
  Selecting,
  Sorting
} from './index'

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

export default function EnhancedTableBody<T extends {id: string}>({
  dense,
  headCells,
  rows,
  rowActions,
  paginating,
  selecting
}: Props<T>) {
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
            {rowActions.map((rowAction) => (
              <TableCell
                key={String(rowAction.id)}
                align={'right'}
              >
                {rowAction.render(row)}
              </TableCell>
            ))}
          </TableRow>
        )
      })}
      {emptyRows > 0 && (
        <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
          <TableCell colSpan={headCells.length + rowActions.length + 1} />
        </TableRow>
      )}
    </TableBody>
  )
}
