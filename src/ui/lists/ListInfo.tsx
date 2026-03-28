import {Card, Stack, TextField} from '@mui/material'
import getEntityByProperty from '@/queries/getEntityByProperty'
import {ListDTO} from '@/dto/ListDTO'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import AsyncStatus from '@/components/AsyncStatus'
import Typography from '@mui/material/Typography'
import {TaskList} from '@/ui/tasks/TaskList'
import getAllEntities from '@/queries/getAllEntities'
import {TaskDTO} from '@/dto/TaskDTO'
import {TaskForm} from '@/ui/tasks/TaskForm'
import {CategoryDTO} from '@/dto/CategoryDTO'

const API_TASKS = 'http://localhost:3001/tasks'
const API_CATEGORIES = 'http://localhost:3001/categories'

interface Props {
  id: string
}

export default function ListInfo({id}: Props) {
  const queryClient = useQueryClient()

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

  const {data: categories = []} = useQuery<CategoryDTO[]>({
    queryKey: ['categories'],
    queryFn: async () => (await fetch(API_CATEGORIES)).json()
  })

  const addTask = useMutation({
    mutationFn: async ({
      title,
      categoryId
    }: {
      title: string
      categoryId: string | null
    }) => {
      const res = await fetch(API_TASKS, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, categoryId, completed: false})
      })
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['tasks']})
  })

  const toggleTask = useMutation({
    mutationFn: async (task: TaskDTO) => {
      const res = await fetch(`${API_TASKS}/${task.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({completed: !task.completed})
      })
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['tasks']})
  })

  const deleteTask = useMutation({
    mutationFn: async (taskId: string) => {
      await fetch(`${API_TASKS}/${taskId}`, {method: 'DELETE'})
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['tasks']})
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
        <Stack
          sx={{p: 2}}
          spacing={2}
          component={Card}
        >
          <TaskForm
            categories={categories}
            onAdd={(title, categoryId) => addTask.mutate({title, categoryId})}
          />
          <AsyncStatus
            isPending={isLoadingTasks}
            error={errorTasks}
          >
            <TaskList
              tasks={tasks}
              onToggle={(t) => toggleTask.mutate(t)}
              onDelete={(id) => deleteTask.mutate(id)}
            />
          </AsyncStatus>
        </Stack>
      </Stack>
    </AsyncStatus>
  )
}
