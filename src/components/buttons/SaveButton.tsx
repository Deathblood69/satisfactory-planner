import Button from '@mui/material/Button'
import {Save} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'

interface Props {
  square?: boolean
}

export default function SaveButton({square}: Props) {
  return square ? (
    <Button
      type={'submit'}
      variant="contained"
      fullWidth={true}
    >
      <Save />
    </Button>
  ) : (
    <IconButton>
      <Save />
    </IconButton>
  )
}
