import * as React from 'react'
import {Dispatch, Fragment, SetStateAction, useMemo} from 'react'
import {useFormContext} from '@/providers/FormProvider'
import {CategoryCreateDTO} from '@/dto/categories/CategoryCreateDTO'
import AddButton from '@/components/buttons/AddButton'
import DeleteButton from '@/components/buttons/DeleteButton'
import {TextField} from '@mui/material'
import {CategoryDTO} from '@/dto/categories/CategoryDTO'

interface CategoryAddProps {
  value: CategoryDTO | undefined
  setValue: Dispatch<SetStateAction<CategoryDTO | undefined>>
}

export default function CategoryAdd({value, setValue}: CategoryAddProps) {
  const {onChangeForm} = useFormContext<CategoryCreateDTO>()

  const currentValue = useMemo(() => {
    return value?.name ?? ''
  }, [value])

  function handleChange(value: string) {
    setValue((prevState) => prevState && {...prevState, name: value})
    onChangeForm({
      name: value
    })
  }

  console.log(value)

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
      <AddButton />
      <DeleteButton square={true} />
    </Fragment>
  )
}
