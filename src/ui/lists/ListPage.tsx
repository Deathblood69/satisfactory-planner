'use client'

import {Fragment, useMemo} from 'react'
import {Card, Stack} from '@mui/material'
import AppTabs, {TabItem} from '@/components/AppTabs'
import TasksTab from '@/ui/tasks/TasksTab'
import ListTab from '@/ui/lists/ListTab'
import CategoryTab from '@/ui/categories/CategoryTab'
import Typography from '@mui/material/Typography'
import {useQuery} from '@tanstack/react-query'
import {API_CONFIG} from '@/config/api.config'
import getEntityById from '@/queries/getEntityById'
import {ListDTO} from '@/dto/lists/ListDTO'

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
        children: <ListTab id={id} />
      },
      {id: 1, label: 'Categories', children: <CategoryTab listId={id} />},
      {id: 2, label: 'Tasks', children: <TasksTab listId={id} />}
    ]
  }, [id])

  return (
    <Fragment>
      <Stack
        direction="column"
        spacing={2}
        justifyContent={'center'}
        component={Card}
        sx={{p: 2}}
      >
        <Typography
          variant="h5"
          gutterBottom
        >
          {list?.name}
        </Typography>

        <AppTabs items={items} />
      </Stack>
    </Fragment>
  )
}
