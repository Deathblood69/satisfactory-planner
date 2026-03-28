import {Fragment} from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {TaskDTO} from '@/dto/TaskDTO'
import getAllEntities from '@/queries/getAllEntities'
import AsyncStatus from '@/components/AsyncStatus'
import {TaskList} from '@/ui/tasks/TaskList'

interface Props {
  idList?: string
}

const API_TASKS = 'http://localhost:3001/tasks'

export default function TaskDisplay({idList}: Props) {
  const queryClient = useQueryClient()

  const {
    data: tasks,
    isLoading: isLoadingTasks,
    error: errorTasks
  } = useQuery({
    queryKey: ['tasks', idList],
    queryFn: () => getAllEntities<TaskDTO[]>('tasks'),
    // The query will not execute until the userId exists
    enabled: idList !== 'new'
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
    <Fragment>
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
    </Fragment>
  )
}
