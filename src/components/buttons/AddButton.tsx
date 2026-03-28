import Button from '@mui/material/Button'
import {Add} from '@mui/icons-material'

export default function AddButton() {
  return (
    <Button
      type={'submit'}
      variant="contained"
    >
      <Add />
    </Button>
  )
}
