'use client'

import {Fragment} from 'react'
import EnhancedTable, {HeadCell} from '@/components/EnhancedTable'
import {ListDTO} from '@/dto/ListDTO'
import AsyncStatus from '@/components/AsyncStatus'
import usePagination from '@/hooks/usePagination'

const headCells: readonly HeadCell<ListDTO>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {id: 'instance', numeric: false, disablePadding: false, label: 'Instance'},
  {id: 'private', numeric: false, disablePadding: false, label: 'Private'}
]

export default function ListsDisplay() {
  const {
    data,
    count,
    order,
    orderBy,
    page,
    rowsPerPage,
    selected,
    error,
    isPending,
    setOrder,
    setOrderBy,
    setPage,
    setRowsPerPage,
    setSelected
  } = usePagination<ListDTO>('lists')

  return (
    <Fragment>
      <AsyncStatus
        isPending={isPending}
        error={error}
      >
        <EnhancedTable<ListDTO>
          title={'Lists'}
          headCells={headCells}
          rows={data}
          count={count}
          order={order}
          orderBy={orderBy}
          page={page}
          rowsPerPage={rowsPerPage}
          selected={selected}
          onOrderChange={(newOrder, newOrderBy) => {
            setOrder(newOrder)
            setOrderBy(newOrderBy)
          }}
          onPageChange={(newPage) => setPage(newPage)}
          onRowsPerPageChange={(newRowsPerPage) => {
            setRowsPerPage(newRowsPerPage)
            setPage(0)
          }}
          onSelectedChange={(newSelected) => setSelected(newSelected)}
        />
      </AsyncStatus>
    </Fragment>
  )
}
