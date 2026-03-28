import * as React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import {useQuery} from '@tanstack/react-query'

import getEntitiesByProperty from '@/queries/getEntitiesByProperty'
import {API_CONFIG} from '@/config/api.config'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'
import {Card} from '@mui/material'

interface Props {
  idList: string
  selectedCategory?: CategoryDTO
  handleCategoryChange: (selectedCategory?: CategoryDTO) => void
}

export default function CategoriesMenu({
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

  return (
    <List
      component={Card}
      elevation={2}
      sx={{width: '20%', p: 2}}
    >
      <ListItemButton
        selected={!selectedCategory}
        onClick={() => handleCategoryChange()}
      >
        <ListItemText primary="None" />
      </ListItemButton>
      {categories &&
        categories.map((category) => (
          <ListItemButton
            key={category.id}
            disabled={category.disabled}
            selected={
              category.id === selectedCategory?.id &&
              category.name === selectedCategory.name
            }
            onClick={() => handleCategoryChange(category)}
          >
            <ListItemText primary={category.name} />
          </ListItemButton>
        ))}
    </List>
  )
}
