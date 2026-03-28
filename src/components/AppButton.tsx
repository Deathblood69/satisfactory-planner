import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {ReactNode} from 'react'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  icon?: boolean
  fullWidth?: boolean
  children: ReactNode
  onClick?: () => void
}

export default function AppButton({
  type,
  icon,
  fullWidth,
  children,
  onClick
}: Props) {
  return icon ? (
    <IconButton
      onClick={onClick}
      type={type}
    >
      {children}
    </IconButton>
  ) : (
    <Button
      type={type}
      variant={type === 'submit' ? 'contained' : 'outlined'}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
