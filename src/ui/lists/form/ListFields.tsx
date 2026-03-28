import {Stack, Switch, TextField} from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import {useFormContext} from '@/providers/FormProvider'
import {ListCreateDTO} from '@/dto/ListCreateDTO'
import {Fragment} from 'react'

export default function ListFields() {
  const {form, onChangeForm} = useFormContext<ListCreateDTO>()

  return (
    <Fragment>
      <Stack
        direction="row"
        spacing={2}
      >
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
        <FormControlLabel
          control={
            <Switch
              id={'private'}
              name={'private'}
              checked={form.private}
              onChange={(event) => {
                onChangeForm({
                  private: event.target.checked
                })
              }}
            />
          }
          label="Private"
        />
      </Stack>
    </Fragment>
  )
}
