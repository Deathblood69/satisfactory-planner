import * as React from 'react'
import {Fragment, useState} from 'react'
import {TaskList} from '@/ui/tasks/TaskList'
import {Stack} from '@mui/material'
import CategoriesList from '@/ui/categories/CategoriesList'
import {CategoryDTO} from '@/dto/CategoryDTO'
import {ListDTO} from '@/dto/ListDTO'
import {useQuery} from '@tanstack/react-query'
import getEntityById from '@/queries/getEntityById'
import {TaskForm} from '@/ui/tasks/TaskForm'

interface Props {
  id: string
}

export default function ListDetail({id}: Props) {
  const {data: list} = useQuery({
    queryKey: ['lists', id],
    queryFn: () => getEntityById<ListDTO>('lists', id)
  })

  const [selectedCategory, setCategory] = useState<CategoryDTO>()

  function handleCategoryChange(category?: CategoryDTO) {
    setCategory(category)
  }

  if (!list) {
    return
  }

  return (
    <Fragment>
      <Stack
        spacing={2}
        direction="row"
      >
        <CategoriesList
          idList={list?.id}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <Stack
          direction="column"
          spacing={2}
          sx={{width: '100%'}}
        >
          <TaskForm idList={list?.id} />
          <TaskList
            idList={list?.id}
            selectedCategory={selectedCategory}
          />
        </Stack>
      </Stack>
    </Fragment>
  )
}
