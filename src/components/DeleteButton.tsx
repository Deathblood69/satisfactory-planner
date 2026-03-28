import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import {Delete} from '@mui/icons-material'

export default function DeleteButton() {
  return (
    <Tooltip title={'Delete'}>
      <IconButton>
        <Delete />
      </IconButton>
    </Tooltip>
  )
}
