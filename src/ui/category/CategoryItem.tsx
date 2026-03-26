'use client'

import {ListItem, ListItemText} from '@mui/material'
import {CategoryTree} from '@/types'

type Props = {
  category: CategoryTree
  level?: number
  onSelect?: (categoryId: string) => void
}

export function CategoryItem({category, level = 0, onSelect}: Props) {
  return (
    <>
      <ListItem
        component="div"
        sx={{pl: 2 + level * 2}}
        onClick={() => onSelect && onSelect(category.id)}
      >
        <ListItemText>{category.name}</ListItemText>
      </ListItem>
      {category.children.length > 0 &&
        category.children.map((child) => (
          <CategoryItem
            key={child.id}
            category={child}
            level={level + 1}
            onSelect={onSelect}
          />
        ))}
    </>
  )
}
