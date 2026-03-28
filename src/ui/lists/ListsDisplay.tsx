'use client'

import {Fragment, useState} from 'react'
import EnhancedTable, {HeadCell} from '@/components/EnhancedTable'
import {ListDTO} from '@/dto/ListDTO'
import {useQuery} from '@tanstack/react-query'
import AsyncStatus from '@/components/AsyncStatus'
import getPaginatedQuery from '@/queries/getPaginatedQuery'

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
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<keyof ListDTO>('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selected, setSelected] = useState<readonly string[]>([])

  const {data, isPending, error} = useQuery({
    queryKey: ['lists', page, rowsPerPage],
    queryFn: () =>
      getPaginatedQuery<ListDTO>('lists', {
        page: page + 1,
        perPage: rowsPerPage
      })
  })

  return (
    <Fragment>
      <AsyncStatus
        isPending={isPending}
        error={error?.message}
      >
        <EnhancedTable<ListDTO>
          title={'Lists'}
          headCells={headCells}
          rows={data?.data}
          count={data?.items}
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
