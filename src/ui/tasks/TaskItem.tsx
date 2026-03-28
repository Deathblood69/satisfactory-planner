import {TaskDTO} from '@/dto/tasks/TaskDTO'
import {Card, Checkbox, IconButton, Stack, Typography} from '@mui/material'
import {Delete} from '@mui/icons-material'

interface Props {
  task: TaskDTO
  onToggle: (task: TaskDTO) => void
  onDelete: (id: string) => void
}

export default function TaskItem({task, onToggle, onDelete}: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      component={Card}
      sx={{width: '100%', p: 2}}
      elevation={2}
    >
      {onToggle && (
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
      )}
      <Typography
        sx={{
          textDecoration: task.completed ? 'line-through' : 'none',
          flex: 1
        }}
      >
        {task.name}
      </Typography>
      {onDelete && (
        <IconButton onClick={() => onDelete(task.id)}>
          <Delete />
        </IconButton>
      )}
    </Stack>
  )
}
