import {Fragment, useState} from 'react'
import {TaskList} from '@/ui/tasks/TaskList'
import {Stack} from '@mui/material'
import CategoriesList from '@/ui/categories/CategoriesList'
import {CategoryDTO} from '@/dto/CategoryDTO'

interface Props {
  idList?: string
}

export default function TaskDisplay({idList}: Props) {
  const [selectedCategory, setCategory] = useState<CategoryDTO>()

  function handleCategoryChange(category?: CategoryDTO) {
    setCategory(category)
  }

  return (
    <Fragment>
      <Stack
        spacing={2}
        direction="row"
      >
        <CategoriesList
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <TaskList
          idList={idList}
          selectedCategory={selectedCategory}
        />
      </Stack>
    </Fragment>
  )
}
