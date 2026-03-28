'use client'

import {Button, Stack, TextField} from '@mui/material'

interface Props {
  listId: string
}

export default function CategoryTab({listId}: Props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{mb: 2}}
    >
      <TextField
        fullWidth
        label="Nouvelle catégorie"
      />

      <Button variant="contained">{'Ajouter'}</Button>
    </Stack>
  )
}
