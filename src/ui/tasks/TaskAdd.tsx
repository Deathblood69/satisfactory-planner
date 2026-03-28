'use client'

import {Stack, TextField} from '@mui/material'
import AppButton from '@/components/AppButton'
import {Add} from '@mui/icons-material'
import * as React from 'react'
import {useFormContext} from '@/providers/FormProvider'
import {CategoryCreateDTO} from '@/dto/categories/CategoryCreateDTO'

export function TaskAdd() {
  const {form, onChangeForm} = useFormContext<CategoryCreateDTO>()

  function handleChange(value: string) {
    onChangeForm({name: value ?? ''})
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{mb: 2}}
    >
      <TextField
        id={'name'}
        name={'name'}
        label={'Name'}
        value={form.name}
        onChange={(event) => handleChange(event.target.value)}
        fullWidth
      />
      <AppButton type={'submit'}>
        <Add />
      </AppButton>
    </Stack>
  )
}
