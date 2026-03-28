'use client'

import {Fragment} from 'react'
import EnhancedTable, {HeadCell} from '@/components/EnhancedTable'
import {ListDTO} from '@/dto/ListDTO'
import {listDTOS} from '@/data/lists.data'

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
  return (
    <Fragment>
      <EnhancedTable<ListDTO>
        title={'Lists'}
        rows={listDTOS}
        headCells={headCells}
        order={'asc'}
        orderBy={'name'}
      />
    </Fragment>
  )
}
