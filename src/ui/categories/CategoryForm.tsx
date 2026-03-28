'use client'

import {Stack} from '@mui/material'
import * as React from 'react'
import {useMemo, useState} from 'react'
import {API_CONFIG} from '@/config/api.config'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'
import {FormProvider} from '@/providers/FormProvider'
import {CategoryCreateDTO} from '@/dto/categories/CategoryCreateDTO'
import {CategoryService} from '@/services/CategoryService'
import CategoryFields from '@/ui/categories/CategoryFields'
import CategoriesList from '@/ui/categories/CategoriesList'
import AddButton from '@/components/AddButton'
import DeleteButton from '@/components/DeleteButton'

interface Props {
  id?: string
  listId: string
}

export default function CategoryForm({id, listId}: Props) {
  const [selectedCategory, setCategory] = useState<CategoryDTO>()

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

  return (
    <FormProvider<CategoryCreateDTO, CategoryDTO>
      entity={API_CONFIG.categories}
      defaultForm={defaultForm}
      onSave={handleSave}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{mb: 2}}
      >
        <CategoryFields />
        <AddButton />
        <DeleteButton square={true} />
      </Stack>
      <CategoriesList
        idList={listId}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
    </FormProvider>
  )
}
