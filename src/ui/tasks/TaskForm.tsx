'use client'

import {useState} from 'react'
import {Button, Stack, TextField} from '@mui/material'
import {CategoryDTO} from '@/dto/CategoryDTO'
import AppAutocomplete from '@/components/AppAutocomplete'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

const API_TASKS = 'http://localhost:3001/tasks'
const API_CATEGORIES = 'http://localhost:3001/categories'

export function TaskForm() {
  const queryClient = useQueryClient()

  const {data: categories = []} = useQuery<CategoryDTO[]>({
    queryKey: ['categories'],
    queryFn: async () => (await fetch(API_CATEGORIES)).json()
  })

  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)

  function handleAddCategory(value: CategoryDTO | null) {
    if (value === null) {
      return
    }

    setCategoryId(value?.id)
  }

  const addTask = useMutation({
    mutationFn: async ({
      title,
      categoryId
    }: {
      title: string
      categoryId: string | null
    }) => {
      const res = await fetch(API_TASKS, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, categoryId, completed: false})
      })
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['tasks']})
  })

  const handleSubmit = () => {
    if (!title.trim()) return

    addTask.mutate({
      title,
      categoryId
    })

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
