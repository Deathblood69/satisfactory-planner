'use client'

import {Card, Stack, Typography} from '@mui/material'
import {Fragment} from 'react'
import sortTaskById from '@/utils/sortTaskById'
import {filterTasksByCategory} from '@/utils/filterTasksByCategory'
import sortArrayByProperty from '@/utils/sortArrayByProperty'
import {TaskDTO} from '@/dto/TaskDTO'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import getAllEntities from '@/queries/getAllEntities'
import TaskItem from '@/ui/tasks/TaskItem'
import {API_CONFIG} from '@/config/api.config'

const API_TASKS = 'http://localhost:3001/tasks'

type Props = {
  idList?: string
  selectedCategory?: CategoryDTO
}

export function TaskList({idList, selectedCategory}: Props) {
  const queryClient = useQueryClient()

  const {data: categories} = useQuery({
    queryKey: [API_CONFIG.categories],
    queryFn: () => getAllEntities<CategoryDTO[]>(API_CONFIG.categories)
  })

  const {data: tasks} = useQuery({
    queryKey: [API_CONFIG.tasks, idList],
    queryFn: () => getAllEntities<TaskDTO[]>(API_CONFIG.tasks)
  })

  const {mutate: onToggle} = useMutation({
    mutationFn: async (task: TaskDTO) => {
      const res = await fetch(`${API_TASKS}/${task.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({completed: !task.completed})
      })
      return res.json()
    },
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: [API_CONFIG.tasks]})
  })

  const {mutate: onDelete} = useMutation({
    mutationFn: async (taskId: string) => {
      await fetch(`${API_TASKS}/${taskId}`, {method: 'DELETE'})
    },
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: [API_CONFIG.tasks]})
  })

  if (!tasks || tasks.length === 0) {
    return
  }

  return (
    <Stack
      direction={'column'}
      sx={{width: '100%', p: 2}}
      spacing={2}
      component={Card}
    >
      {!selectedCategory && (
        <Fragment>
          <Typography>
            <strong>{'None'}</strong>
          </Typography>
          {tasks
            ?.filter((task) => !task.categoryId)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
        </Fragment>
      )}
      {categories
        ?.filter((category) =>
          selectedCategory ? selectedCategory.id === category.id : true
        )
        ?.map((category) => {
          const filtered = tasks ? filterTasksByCategory(tasks, category) : []
          const preSorted = sortArrayByProperty(filtered, 'completed').reverse()
          const completed = preSorted.filter((task) => task.completed)
          const notCompleted = preSorted.filter((task) => !task.completed)
          const sorted = [
            ...sortTaskById(notCompleted),
            ...sortTaskById(completed)
          ]
          return (
            <Fragment key={category.id}>
              <Typography>
                <strong>{category.name}</strong>
              </Typography>
              {sorted.map((task) => {
                return (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                  />
                )
              })}
            </Fragment>
          )
        })}
    </Stack>
  )
}
