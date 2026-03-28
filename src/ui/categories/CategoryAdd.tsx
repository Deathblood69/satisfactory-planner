import * as React from 'react'
import {Fragment} from 'react'
import {useFormContext} from '@/providers/FormProvider'
import {CategoryCreateDTO} from '@/dto/categories/CategoryCreateDTO'
import {TextField} from '@mui/material'
import AppButton from '@/components/AppButton'
import {Add} from '@mui/icons-material'

export default function CategoryAdd() {
  const {form, onChangeForm} = useFormContext<CategoryCreateDTO>()

  function handleChange(value: string) {
    onChangeForm({name: value})
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}
