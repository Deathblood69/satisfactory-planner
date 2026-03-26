'use client'

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Container, Typography} from '@mui/material'
import {Category, Task} from '@/types'
import {TaskForm} from '@/ui/task/TaskForm'
import {TaskList} from '@/ui/task/TaskList'

const API_TASKS = 'http://localhost:3001/tasks'
const API_CATEGORIES = 'http://localhost:3001/categories'

export default function TasksPage() {
  const queryClient = useQueryClient()

  const {data: categories = []} = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => (await fetch(API_CATEGORIES)).json()
  })

  const {data: tasks = []} = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => (await fetch(API_TASKS)).json()
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
    mutationFn: async (task: Task) => {
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
    <Container
      maxWidth="md"
      sx={{mt: 4}}
    >
      <Typography
        variant="h4"
        sx={{mb: 2}}
      >
        Tâches
      </Typography>

      <TaskForm
        categories={categories}
        onAdd={(title, categoryId) => addTask.mutate({title, categoryId})}
      />

      <TaskList
        tasks={tasks}
        selectedCategory={null}
        onEdit={() => {}}
        onToggle={(t) => toggleTask.mutate(t)}
        onDelete={(id) => deleteTask.mutate(id)}
      />
    </Container>
  )
}
