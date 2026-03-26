'use client'

import {Checkbox, IconButton, Stack, Typography} from '@mui/material'
import {Delete, Edit} from '@mui/icons-material'
import {Category, Task} from '@/types'
import {Fragment, useMemo} from 'react'
import sortTaskById from '@/utils/sortTaskById'
import {filterTasksByCategory} from '@/utils/filterTasksByCategory'
import sortArrayByProperty from '@/utils/sortArrayByProperty'

type Props = {
  tasks: Task[]
  selectedCategory: Category | null
  onEdit?: (taskId: string) => void
  onToggle?: (task: Task) => void
  onDelete?: (taskId: string) => void
}

export function TaskList({
  tasks,
  selectedCategory,
  onEdit,
  onToggle,
  onDelete
}: Props) {
  const filtered = useMemo(() => {
    return selectedCategory
      ? filterTasksByCategory(tasks, selectedCategory)
      : tasks
  }, [selectedCategory, tasks])

  const [completed, notCompleted] = useMemo(() => {
    const sorted = sortArrayByProperty(filtered, 'completed').reverse()
    const completed = sorted.filter((task) => task.completed)
    const notCompleted = sorted.filter((task) => !task.completed)
    return [completed, notCompleted]
  }, [filtered])

  const sorted = useMemo(() => {
    return [...sortTaskById(notCompleted), ...sortTaskById(completed)]
  }, [completed, notCompleted])

  return (
    <Fragment>
      {filtered.length > 0 && selectedCategory && (
        <Typography>
          <strong>{selectedCategory.name}</strong>
        </Typography>
      )}
      {sorted.map((t) => {
        return (
          <Stack
            key={t.id}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            {onToggle && (
              <Checkbox
                checked={t.completed}
                onChange={() => onToggle(t)}
              />
            )}
            <Typography
              sx={{
                textDecoration: t.completed ? 'line-through' : 'none',
                flex: 1
              }}
            >
              {t.title}
            </Typography>
            {onEdit && (
              <IconButton onClick={() => onEdit(t.id)}>
                <Edit />
              </IconButton>
            )}
            {onDelete && (
              <IconButton onClick={() => onDelete(t.id)}>
                <Delete />
              </IconButton>
            )}
          </Stack>
        )
      })}
    </Fragment>
  )
}
