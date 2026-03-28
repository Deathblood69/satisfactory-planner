import {TextField} from '@mui/material'
import {useFormContext} from '@/providers/FormProvider'
import {ListCreateDTO} from '@/dto/lists/ListCreateDTO'
import {Fragment} from 'react'

export default function CategoryFields() {
  const {form, onChangeForm} = useFormContext<ListCreateDTO>()

  return (
    <Fragment>
      <TextField
        id={'name'}
        name={'name'}
        label={'Name'}
        value={form.name}
        fullWidth
        onChange={(event) => {
          onChangeForm({
            name: event.target.value
          })
        }}
      />
    </Fragment>
  )
}
