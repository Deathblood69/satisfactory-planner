'use client'

import {Container, Stack, Typography} from '@mui/material'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Category, CategoryTree, Task} from '@/types'
import {TaskList} from '@/ui/task/TaskList'
import {CategoryMenu} from '@/ui/category/CategoryMenu'
import {sortCategoriesByOrder} from '@/utils/sortCategoriesByOrder'

const API_TASKS = 'http://localhost:3001/tasks'
const API_CATEGORIES = 'http://localhost:3001/categories'

export default function HomePage() {
  const queryClient = useQueryClient()

  // Fetch categories
  const {data: categoriesData = []} = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => (await fetch(API_CATEGORIES)).json()
  })

  // Build tree and sort by order
  const categoryTree: CategoryTree[] = sortCategoriesByOrder(
    categoriesData.map((c) => ({...c, children: []}))
  )

  // Fetch tasks
  const {data: tasksData = []} = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => (await fetch(API_TASKS)).json()
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

  return (
    <Container
      maxWidth="md"
      sx={{mt: 4}}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{mb: 2}}
      >
        <Typography variant="h4">Liste de tâches</Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
      >
        {/* Category menu */}
        <CategoryMenu categories={categoryTree} />

        {/* Task list filtered by selected category */}
        <Stack
          spacing={1}
          sx={{flex: 1}}
        >
          {categoriesData.map((category) => (
            <TaskList
              key={category.id}
              tasks={tasksData}
              selectedCategory={category}
              onEdit={() => {}}
              onToggle={(t) => toggleTask.mutate(t)}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}
