import * as React from 'react'
import {Dispatch, Fragment, SetStateAction, useEffect} from 'react'
import {useFormContext} from '@/providers/FormProvider'
import {CategoryCreateDTO} from '@/dto/categories/CategoryCreateDTO'
import {TextField} from '@mui/material'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'
import AppButton from '@/components/AppButton'
import {Add, Delete, Save} from '@mui/icons-material'

interface CategoryAddProps {
  value: CategoryDTO | undefined
  setValue: Dispatch<SetStateAction<CategoryDTO | undefined>>
}

export default function CategoryAdd({value, setValue}: CategoryAddProps) {
  const {form, onChangeForm, onDeleteForm} = useFormContext<CategoryCreateDTO>()

  function handleChange(value: string) {
    setValue((prevState) => prevState && {...prevState, name: value})
  }

  useEffect(() => {
    onChangeForm({name: value?.name ?? ''})
  }, [onChangeForm, value])

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
      <AppButton type={'submit'}>{value?.id ? <Save /> : <Add />}</AppButton>
      {value?.id && (
        <AppButton onClick={() => onDeleteForm(value.id)}>
          <Delete />
        </AppButton>
      )}
    </Fragment>
  )
}
