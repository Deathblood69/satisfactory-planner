'use client'

import {Fragment, useMemo} from 'react'
import {Card, Stack} from '@mui/material'
import AppTabs, {TabItem} from '@/components/AppTabs'
import TasksForm from '@/ui/tasks/TasksForm'
import ListForm from '@/ui/lists/ListForm'
import CategoryForm from '@/ui/categories/CategoryForm'
import Typography from '@mui/material/Typography'
import {useQuery} from '@tanstack/react-query'
import {API_CONFIG} from '@/config/api.config'
import getEntityById from '@/queries/getEntityById'
import {ListDTO} from '@/dto/lists/ListDTO'
import AppChip from '@/components/AppChip'

interface Props {
  id: string
}

export default function ListPage({id}: Props) {
  const {data: list} = useQuery({
    queryKey: [API_CONFIG.lists, id],
    queryFn: () => getEntityById<ListDTO>(API_CONFIG.lists, id),
    enabled: !!id
  })

  const items: TabItem[] = useMemo(() => {
    return [
      {
        id: 0,
        label: 'Information',
        children: <ListForm id={id} />
      },
      {
        id: 1,
        label: 'Categories',
        children: <CategoryForm listId={id} />
      },
      {
        id: 2,
        label: 'Tasks',
        children: <TasksForm listId={id} />
      }
    ]
  }, [id])

  return (
    <Fragment>
      <Stack
        direction="column"
        spacing={2}
        component={Card}
        sx={{p: 2}}
      >
        <Stack
          direction="row"
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={2}
        >
          <Typography
            variant="h5"
            gutterBottom
          >
            {list?.name}
          </Typography>
          <AppChip
            id={'private'}
            label={list?.private ? 'Private' : 'Public'}
            clickable={false}
          />
        </Stack>

        <AppTabs items={items} />
      </Stack>
    </Fragment>
  )
}
