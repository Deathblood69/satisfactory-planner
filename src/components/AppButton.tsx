import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {ReactNode} from 'react'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  icon?: boolean
  children: ReactNode
  fullWidth?: boolean
}

export default function AppButton({type, icon, fullWidth, children}: Props) {
  return icon ? (
    <IconButton type={type}>{children}</IconButton>
  ) : (
    <Button
      type={type}
      variant={type === 'submit' ? 'contained' : 'outlined'}
      fullWidth={fullWidth}
    >
      {children}
    </Button>
  )
}
