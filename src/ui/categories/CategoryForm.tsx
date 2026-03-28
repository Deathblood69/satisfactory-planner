'use client'

import {Stack} from '@mui/material'
import * as React from 'react'
import {useMemo, useState} from 'react'
import {API_CONFIG} from '@/config/api.config'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'
import {FormProvider} from '@/providers/FormProvider'
import {CategoryCreateDTO} from '@/dto/categories/CategoryCreateDTO'
import {CategoryService} from '@/services/CategoryService'
import CategoriesList from '@/ui/categories/CategoriesList'
import CategoryAdd from '@/ui/categories/CategoryAdd'

interface Props {
  id?: string
  listId: string
}

export default function CategoryForm({id, listId}: Props) {
  const [category, setCategory] = useState<CategoryDTO>()

  const defaultForm: CategoryCreateDTO = useMemo(() => {
    return {
      name: '',
      listId
    }
  }, [listId])

  function handleCategoryChange(category?: CategoryDTO) {
    setCategory(category)
  }

  async function handleSave(dto: CategoryCreateDTO) {
    let entity: CategoryDTO
    dto.listId = listId
    if (id && !Array.isArray(id) && id !== 'new') {
      entity = await CategoryService.updateList(id, dto)
    } else {
      entity = await CategoryService.createList(dto)
    }
    return entity
  }

  async function handleDelete(id: string) {
    await CategoryService.deleteByIds([id])
  }

  return (
    <FormProvider<CategoryCreateDTO, CategoryDTO>
      entity={API_CONFIG.categories}
      defaultForm={defaultForm}
      onSave={handleSave}
      onDelete={handleDelete}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{mb: 2}}
      >
        <CategoryAdd
          value={category}
          setValue={setCategory}
        />
      </Stack>
      <CategoriesList
        idList={listId}
        selectedCategory={category}
        handleCategoryChange={handleCategoryChange}
      />
    </FormProvider>
  )
}
