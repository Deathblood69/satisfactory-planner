'use client'

import {Fragment, useMemo} from 'react'
import {Stack} from '@mui/material'
import AppTabs, {TabItem} from '@/components/AppTabs'
import TasksTab from '@/ui/tasks/TasksTab'
import ListForm from '@/ui/lists/form/ListForm'
import ListFormLayout from '@/ui/lists/form/ListFormLayout'
import ListFields from '@/ui/lists/form/ListFields'
import CategoryTab from '@/ui/categories/CategoryTab'

interface Props {
  id: string
}

export default function ListPage({id}: Props) {
  const items: TabItem[] = useMemo(() => {
    return [
      {
        id: 0,
        label: 'Information',
        children: (
          <ListFormLayout id={id}>
            <ListForm id={id}>
              <ListFields />
            </ListForm>
          </ListFormLayout>
        )
      },
      {id: 1, label: 'Categories', children: <CategoryTab listId={id} />},
      {id: 2, label: 'Tasks', children: <TasksTab listId={id} />}
    ]
  }, [id])

  return (
    <Fragment>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={'center'}
      >
        <AppTabs items={items} />
      </Stack>
    </Fragment>
  )
}
