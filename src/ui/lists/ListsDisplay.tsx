'use client'

import * as React from 'react'
import {Fragment, useMemo} from 'react'
import EnhancedTable, {
  Action,
  HeadCell,
  RowAction
} from '@/components/EnhancedTable'
import {ListDTO} from '@/dto/ListDTO'
import AsyncStatus from '@/components/AsyncStatus'
import usePagination from '@/hooks/usePagination'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import {Edit, FilterList, Launch} from '@mui/icons-material'
import DeleteButton from '@/components/DeleteButton'
import {ListService} from '@/services/ListService'
import useForm from '@/hooks/useForm'
import NewButton from '@/components/NewButton'
import {ROUTES_CONFIG} from '@/config/routes.config'
import {useRouter} from 'next/navigation'
import ClickableLinkChips from '@/components/ClickableLinkChips'

type Ids = readonly string[] | undefined

export default function ListsDisplay() {
  const router = useRouter()

  const {error, isPending, rows, sorting, paginating, selecting} =
    usePagination<ListDTO>('lists')

  const {onSubmit: onDelete} = useForm<Ids, Ids>('lists', {
    onTrigger: ListService.deleteByIds,
    onSuccess: () => {
      if (selecting.onSelectedChange) {
        selecting.onSelectedChange([])
      }
    }
  })

  const headCells: readonly HeadCell<ListDTO>[] = useMemo(() => {
    return [
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name'
      },
      {
        id: 'private',
        numeric: false,
        disablePadding: false,
        label: 'Private',
        render: (id, value) => (
          <ClickableLinkChips
            id={'private'}
            label={value[id] ? 'True' : 'False'}
          />
        )
      }
    ]
  }, [])

  const rowActions: readonly RowAction<ListDTO>[] = useMemo(() => {
    return [
      {
        id: 'actions',
        label: 'Actions',
        render: (value) => (
          <Tooltip title={'View details'}>
            <IconButton
              onClick={() =>
                router.push(`${ROUTES_CONFIG.lists}/${value.id}/tasks`)
              }
            >
              <Launch />
            </IconButton>
          </Tooltip>
        )
      }
    ] as RowAction<ListDTO>[]
  }, [router])

  const handleClickAction = useMemo(() => {
    return (id: string, selected: readonly string[]) => {
      switch (id) {
        case 'new':
          router.push(`${ROUTES_CONFIG.lists}/new`)
          break
        case 'view':
          router.push(`${ROUTES_CONFIG.lists}/${selected[0]}/tasks`)
          break
        case 'edit':
          router.push(`${ROUTES_CONFIG.lists}/${selected[0]}`)
          break
        case 'delete':
          onDelete(selected)
          break
      }
    }
  }, [router, onDelete])

  const actions = useMemo(() => {
    return [
      {
        id: 'new',
        children: selecting.selected.length === 0 && <NewButton />,
        onClick: handleClickAction
      },
      {
        id: 'edit',
        children: selecting.selected.length === 1 && (
          <Tooltip title={'Edit'}>
            <IconButton>
              <Edit />
            </IconButton>
          </Tooltip>
        ),
        onClick: handleClickAction
      },
      {
        id: 'delete',
        children: selecting.selected.length > 0 && <DeleteButton />,
        onClick: handleClickAction
      },
      {
        id: 'filter',
        children: selecting.selected.length === 0 && (
          <Tooltip title={'Filter list'}>
            <IconButton>
              <FilterList />
            </IconButton>
          </Tooltip>
        ),
        onClick: handleClickAction
      }
    ] satisfies Action[] as readonly Action[]
  }, [handleClickAction, selecting.selected.length])

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
