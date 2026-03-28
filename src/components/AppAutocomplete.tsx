import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

interface Props<T> {
  title: string
  items?: T[]
  getOptionLabel: (option: T) => string
}

export default function AppAutocomplete<T>({
  title,
  items,
  getOptionLabel
}: Props<T>) {
  return (
    <Autocomplete
      id="controllable-states-demo"
      options={items ?? []}
      getOptionLabel={getOptionLabel}
      sx={{width: 300}}
      renderInput={(params) => (
        <TextField
          {...params}
          label={title}
        />
      )}
    />
  )
}
