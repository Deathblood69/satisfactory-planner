'use client'

import {List, ListItem, ListItemText} from '@mui/material'
import {CategoryTree} from '@/types'
import {CategoryItem} from './CategoryItem'

type Props = {
  categories: CategoryTree[]
  onSelect?: (categoryId: string | null) => void
}

export function CategoryMenu({categories, onSelect}: Props) {
  return (
    <List>
      <ListItem
        component="div"
        onClick={() => onSelect && onSelect(null)}
      >
        <ListItemText>Aucune catégorie</ListItemText>
      </ListItem>
      {categories.map((cat) => (
        <CategoryItem
          key={cat.id}
          category={cat}
          onSelect={onSelect}
        />
      ))}
    </List>
  )
}
