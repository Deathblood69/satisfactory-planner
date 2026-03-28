'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Checkbox from '@mui/material/Checkbox'
import {visuallyHidden} from '@mui/utils'
import {HeadCell, RowAction} from '@/components/EnhancedTable'

interface EnhancedTableHeadProps<T extends {id: string}> {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: 'asc' | 'desc'
  orderBy: keyof T
  rowCount?: number
  headCells: readonly HeadCell<T>[]
  rowActions: readonly RowAction<T>[]
}

export function EnhancedTableHead<T extends {id: string}>({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  headCells,
  rowActions
}: EnhancedTableHeadProps<T>) {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={
              !rowCount ? false : numSelected > 0 && numSelected < rowCount
            }
            checked={
              !rowCount ? false : rowCount > 0 && numSelected === rowCount
            }
            onChange={onSelectAllClick}
          />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box
                  component="span"
                  sx={visuallyHidden}
                >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
        {rowActions.map((rowAction) => (
          <TableCell
            key={String(rowAction.id)}
            align={'right'}
          >
            {rowAction.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
