import {TaskDTO} from '@/dto/tasks/TaskDTO'
import {Checkbox, IconButton, Stack, Typography} from '@mui/material'
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
      spacing={1}
      alignItems="center"
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
