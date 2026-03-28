import {Fragment, useState} from 'react'
import {TaskList} from '@/ui/tasks/TaskList'
import {Stack} from '@mui/material'
import CategoriesList from '@/ui/categories/CategoriesList'
import {CategoryDTO} from '@/dto/CategoryDTO'
import Typography from '@mui/material/Typography'
import {ListDTO} from '@/dto/ListDTO'

interface Props {
  list?: ListDTO
}

export default function TaskDisplay({list}: Props) {
  const [selectedCategory, setCategory] = useState<CategoryDTO>()

  function handleCategoryChange(category?: CategoryDTO) {
    setCategory(category)
  }

  return (
    <Fragment>
      <Typography
        variant="body2"
        color="textSecondary"
        gutterBottom
      >
        {list?.name}
      </Typography>
      <Stack
        spacing={2}
        direction="row"
      >
        <CategoriesList
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <TaskList
          idList={list?.name}
          selectedCategory={selectedCategory}
        />
      </Stack>
    </Fragment>
  )
}
