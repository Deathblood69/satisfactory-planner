import * as React from 'react'
import {useMemo} from 'react'
import {Action, HeadCell, RowAction} from '@/components/table'
import {ListDTO} from '@/dto/lists/ListDTO'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import {FilterList, Launch} from '@mui/icons-material'
import DeleteButton from '@/components/DeleteButton'
import NewButton from '@/components/NewButton'
import {ROUTES_CONFIG} from '@/config/routes.config'
import AppChip from '@/components/AppChip'
import {useRouter} from 'next/navigation'
import {ListService} from '@/services/ListService'
import useForm from '@/hooks/useForm'
import usePagination from '@/hooks/usePagination'
import {API_CONFIG} from '@/config/api.config'

type Ids = readonly string[] | undefined

export default function useListTable() {
  const router = useRouter()

  const {error, isPending, rows, sorting, paginating, selecting} =
    usePagination<ListDTO>(API_CONFIG.lists)

  const {onSubmit: onDelete} = useForm<Ids, Ids>(API_CONFIG.lists, {
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
          <AppChip
            id={'private'}
            label={value[id] ? 'True' : 'False'}
            clickable={true}
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
              onClick={() => router.push(`${ROUTES_CONFIG.lists}/${value.id}`)}
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

  return {
    headCells,
    rowActions,
    actions,
    error,
    isPending,
    rows,
    sorting,
    paginating,
    selecting
  }
}
