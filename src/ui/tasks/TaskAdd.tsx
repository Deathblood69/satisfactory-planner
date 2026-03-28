'use client'

import {Button, Stack, TextField} from '@mui/material'
import {CategoryDTO} from '@/dto/CategoryDTO'
import AppAutocomplete from '@/components/AppAutocomplete'
import {useQuery} from '@tanstack/react-query'
import getEntityById from '@/queries/getEntityById'

interface Props {
  idList: string
}

export function TaskAdd({idList}: Props) {
  const {data: categories} = useQuery({
    queryKey: ['categories', idList],
    queryFn: () => getEntityById<CategoryDTO[]>('categories', idList)
  })

  function getOptionLabel(option: CategoryDTO) {
    return option.name
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{mb: 2}}
    >
      <TextField
        fullWidth
        label="Nouvelle tâche"
      />
      <AppAutocomplete<CategoryDTO>
        title="Catégories"
        items={categories}
        getOptionLabel={getOptionLabel}
      />
      <Button variant="contained">{'Ajouter'}</Button>
    </Stack>
  )
}
