import * as React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import {useQuery} from '@tanstack/react-query'
import getAllEntities from '@/queries/getAllEntities'
import {CategoryDTO} from '@/dto/CategoryDTO'

interface Props {
  selectedCategory?: CategoryDTO
  handleCategoryChange: (selectedCategory?: CategoryDTO) => void
}

export default function CategoriesList({
  selectedCategory,
  handleCategoryChange
}: Props) {
  const {data: categories} = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllEntities<CategoryDTO[]>('categories')
  })

  return (
    categories && (
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
  )
}
