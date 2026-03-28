'use client'

import {useState} from 'react'
import {Button, Stack, TextField} from '@mui/material'
import {CategoryDTO} from '@/dto/CategoryDTO'
import AppAutocomplete from '@/components/AppAutocomplete'

type Props = {
  categories: CategoryDTO[]
  onAdd: (title: string, categoryId: string | null) => void
}

export function TaskForm({categories, onAdd}: Props) {
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)

  function handleAddCategory(value: CategoryDTO | null) {
    if (value === null) {
      return
    }

    setCategoryId(value?.id)
  }

  const handleSubmit = () => {
    if (!title.trim()) return
    onAdd(title, categoryId)
    setTitle('')
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{mb: 2}}
    >
      <TextField
        fullWidth
        label="Nouvelle tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <AppAutocomplete
        title="Catégories"
        items={categories}
        onChange={handleAddCategory}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
      >
        Ajouter
      </Button>
    </Stack>
  )
}
