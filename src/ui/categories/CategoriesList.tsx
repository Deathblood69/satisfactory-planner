'use client'

import {Stack} from '@mui/material'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import getAllEntities from '@/queries/getAllEntities'
import {API_CONFIG} from '@/config/api.config'
import CategoryItem from '@/ui/categories/CategoryItem'

const API_TASKS = 'http://localhost:3001/categories'

export default function CategoriesList() {
  const queryClient = useQueryClient()

  const {data: categories} = useQuery({
    queryKey: [API_CONFIG.categories],
    queryFn: () => getAllEntities<CategoryDTO[]>(API_CONFIG.categories)
  })

  const {mutate: onDelete} = useMutation({
    mutationFn: async (taskId: string) => {
      await fetch(`${API_TASKS}/${taskId}`, {method: 'DELETE'})
    },
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: [API_CONFIG.categories]})
  })

  if (!categories || categories.length === 0) {
    return
  }

  return (
    <Stack
      direction={'column'}
      spacing={2}
    >
      {categories?.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  )
}
