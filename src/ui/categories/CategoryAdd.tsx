import * as React from 'react'
import {Dispatch, Fragment, SetStateAction, useMemo} from 'react'
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

  const currentValue = useMemo(() => {
    return form.name
  }, [form.name])

  function handleChange(value: string) {
    console.log(value)
    setValue((prevState) => prevState && {...prevState, name: value})
    onChangeForm({
      name: value
    })
  }

  return (
    <Fragment>
      <TextField
        id={'name'}
        name={'name'}
        label={'Name'}
        value={currentValue}
        fullWidth
        onChange={(event) => handleChange(event.target.value)}
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
