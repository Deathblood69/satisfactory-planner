import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete'
import {CategoryDTO} from '@/dto/CategoryDTO'

const filter = createFilterOptions<CategoryDTO>()

interface Props {
  title: string
  items: CategoryDTO[]
  onChange: (value: CategoryDTO | null) => void
}

export default function AppAutocomplete({items, onChange}: Props) {
  const [value, setValue] = React.useState<CategoryDTO | null>(null)

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        let finalValue: CategoryDTO | null

        if (typeof newValue === 'string') {
          finalValue = {
            id: crypto.randomUUID(),
            name: newValue,
            parentId: null,
            order: 0
          }
        } else if (newValue && newValue.inputValue) {
          finalValue = {
            id: crypto.randomUUID(),
            name: newValue.inputValue,
            parentId: null,
            order: 0
          }
        } else {
          finalValue = newValue
        }

        setValue(finalValue)
        onChange(finalValue)
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        const {inputValue} = params

        const isExisting = options.some((option) => option.name === inputValue)
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            id: crypto.randomUUID(),
            name: `Add "${inputValue}"`,
            parentId: null,
            order: 0,
            inputValue
          })
        }

        return filtered
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={items}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option
        return option.inputValue ?? option.name
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{width: 300}}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Category"
        />
      )}
    />
  )
}
