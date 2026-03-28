'use client'

import IconButton from '@mui/material/IconButton'
import {Add} from '@mui/icons-material'
import Tooltip from '@mui/material/Tooltip'

export default function NewButton() {
  return (
    <Tooltip title={'Create'}>
      <IconButton>
        <Add />
      </IconButton>
    </Tooltip>
  )
}
