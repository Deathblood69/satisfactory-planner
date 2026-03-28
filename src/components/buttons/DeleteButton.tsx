import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import {Delete} from '@mui/icons-material'
import Button from '@mui/material/Button'

interface Props {
  square?: boolean
}

export default function DeleteButton({square}: Props) {
  return (
    <Tooltip title={'Delete'}>
      {square ? (
        <Button
          type={'submit'}
          variant="outlined"
        >
          <Delete />
        </Button>
      ) : (
        <IconButton>
          <Delete />
        </IconButton>
      )}
    </Tooltip>
  )
}
