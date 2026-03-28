import {Card, IconButton, Stack, Typography} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'

interface Props {
  category: CategoryDTO
  onDelete: (id: string) => void
}

export default function CategoryItem({category, onDelete}: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      component={Card}
      elevation={2}
      sx={{width: '100%', p: 2}}
    >
      <Typography sx={{width: '100%'}}>{category.name}</Typography>
      {onDelete && (
        <IconButton onClick={() => onDelete(category.id)}>
          <Delete />
        </IconButton>
      )}
    </Stack>
  )
}
