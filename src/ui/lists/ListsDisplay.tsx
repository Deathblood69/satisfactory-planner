'use client'

import * as React from 'react'
import {Fragment} from 'react'

import {ListDTO} from '@/dto/ListDTO'
import AsyncStatus from '@/components/AsyncStatus'
import useListTable from '@/ui/lists/useListTable'
import {EnhancedTable} from '@/components/table'

export default function ListsDisplay() {
  const {
    headCells,
    actions,
    rowActions,
    error,
    isPending,
    rows,
    sorting,
    paginating,
    selecting
  } = useListTable()

  return (
    <Fragment>
      <AsyncStatus
        isPending={isPending}
        error={error}
      >
        <EnhancedTable<ListDTO>
          title={'Lists'}
          headCells={headCells}
          actions={actions}
          rows={rows}
          rowActions={rowActions}
          sorting={sorting}
          paginating={paginating}
          selecting={selecting}
        />
      </AsyncStatus>
    </Fragment>
  )
}
