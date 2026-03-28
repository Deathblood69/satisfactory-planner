'use client'

import {Stack, TextField} from '@mui/material'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'
import AppAutocomplete from '@/components/AppAutocomplete'
import {useQuery} from '@tanstack/react-query'
import {API_CONFIG} from '@/config/api.config'
import getEntitiesByProperty from '@/queries/getEntitiesByProperty'
import AddButton from '@/components/AddButton'

interface Props {
  idList: string
}

export function TaskAdd({idList}: Props) {
  const {data: categories} = useQuery({
    queryKey: [API_CONFIG.categories],
    queryFn: () =>
      getEntitiesByProperty<CategoryDTO>(
        API_CONFIG.categories,
        'listId',
        idList
      )
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
        label="New task"
      />
      <AppAutocomplete<CategoryDTO>
        title="Categories"
        items={categories}
        getOptionLabel={getOptionLabel}
      />
      <AddButton />
    </Stack>
  )
}
