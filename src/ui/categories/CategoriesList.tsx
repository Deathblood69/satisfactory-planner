import * as React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import {useQuery} from '@tanstack/react-query'

import getEntitiesByProperty from '@/queries/getEntitiesByProperty'
import {API_CONFIG} from '@/config/api.config'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'

interface Props {
  idList: string
  selectedCategory?: CategoryDTO
  handleCategoryChange: (selectedCategory?: CategoryDTO) => void
}

export default function CategoriesList({
  idList,
  selectedCategory,
  handleCategoryChange
}: Props) {
  const {data: categories} = useQuery({
    queryKey: [API_CONFIG.categories],
    queryFn: () =>
      getEntitiesByProperty<CategoryDTO>(
        API_CONFIG.categories,
        'listId',
        idList
      )
  })

  if (!categories || categories.length === 0) return null

  return (
    <List>
      <ListItemButton
        selected={!selectedCategory}
        onClick={() => handleCategoryChange()}
      >
        <ListItemText primary="None" />
      </ListItemButton>
      {categories.map((category) => (
        <ListItemButton
          key={category.id}
          disabled={category.disabled}
          selected={category.id === selectedCategory?.id}
          onClick={() => handleCategoryChange(category)}
        >
          <ListItemText primary={category.name} />
        </ListItemButton>
      ))}
    </List>
  )
}
