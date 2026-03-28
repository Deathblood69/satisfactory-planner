import * as React from 'react'
import {Dispatch, SetStateAction, useMemo} from 'react'
import {TaskList} from '@/ui/tasks/TaskList'
import {Stack} from '@mui/material'
import CategoriesList from '@/ui/categories/CategoriesList'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'
import {TaskAdd} from '@/ui/tasks/TaskAdd'
import {API_CONFIG} from '@/config/api.config'
import {CategoryService} from '@/services/CategoryService'
import {TaskDTO} from '@/dto/tasks/TaskDTO'
import {TaskCreateDTO} from '@/dto/tasks/TaskCreateDTO'
import {TaskService} from '@/services/TaskService'
import {FormProvider} from '@/providers/FormProvider'

interface Props {
  id?: string
  listId: string
  category?: CategoryDTO
  setCategory: Dispatch<SetStateAction<CategoryDTO | undefined>>
}

export default function TasksForm({id, listId, category, setCategory}: Props) {
  const defaultForm: TaskCreateDTO = useMemo(() => {
    return {
      name: '',
      listId
    }
  }, [listId])

  function handleCategoryChange(category?: CategoryDTO) {
    setCategory(category)
  }

  async function handleSave(dto: TaskCreateDTO) {
    let entity: TaskDTO

    dto.listId = listId
    dto.categoryId = category?.id

    if (id && !Array.isArray(id) && id !== 'new') {
      entity = await TaskService.updateList(id, dto)
    } else {
      entity = await TaskService.createList(dto)
    }
    return entity
  }

  async function handleDelete(id: string) {
    await CategoryService.deleteByIds([id])
  }

  return (
    <FormProvider<TaskCreateDTO, TaskDTO>
      entity={API_CONFIG.tasks}
      defaultForm={defaultForm}
      onSave={handleSave}
      onDelete={handleDelete}
    >
      <Stack
        spacing={2}
        direction="column"
      >
        <TaskAdd />
        <Stack
          direction="row"
          spacing={2}
          sx={{width: '100%'}}
        >
          <CategoriesList
            idList={listId}
            selectedCategory={category}
            handleCategoryChange={handleCategoryChange}
          />
          <TaskList
            idList={listId}
            selectedCategory={category}
          />
        </Stack>
      </Stack>
    </FormProvider>
  )
}
