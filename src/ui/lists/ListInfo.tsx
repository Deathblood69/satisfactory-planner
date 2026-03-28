import {Card, Stack, TextField} from '@mui/material'
import getEntityByProperty from '@/queries/getEntityByProperty'
import {ListDTO} from '@/dto/ListDTO'
import {useQuery} from '@tanstack/react-query'
import AsyncStatus from '@/components/AsyncStatus'
import Typography from '@mui/material/Typography'
import {TaskList} from '@/ui/tasks/TaskList'
import getAllEntities from '@/queries/getAllEntities'
import {TaskDTO} from '@/dto/TaskDTO'

interface Props {
  id: string
}

export default function ListInfo({id}: Props) {
  const {
    data: list,
    isLoading: isLoadingList,
    error: errorList
  } = useQuery({
    queryKey: ['lists', id],
    queryFn: () => getEntityByProperty<ListDTO>('lists', 'instance', id)
  })

  const {
    data: tasks,
    isLoading: isLoadingTasks,
    error: errorTasks
  } = useQuery({
    queryKey: ['tasks', id],
    queryFn: () => getAllEntities<TaskDTO[]>('tasks'),
    // The query will not execute until the userId exists
    enabled: !!id
  })

  return (
    <AsyncStatus
      error={errorList}
      isPending={isLoadingList}
    >
      <Stack
        elevation={2}
        sx={{p: 2}}
        spacing={2}
        component={Card}
      >
        <Typography variant="h5">{list?.id}</Typography>
        <TextField
          label={'Name'}
          value={list?.name}
        />
        <TextField
          label={'Instance'}
          value={list?.instance}
        />
        <AsyncStatus
          isPending={isLoadingTasks}
          error={errorTasks}
        >
          <TaskList tasks={tasks} />
        </AsyncStatus>
      </Stack>
    </AsyncStatus>
  )
}
