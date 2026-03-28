import {Button} from '@mui/material'
import Link from 'next/link'
import {ReactNode} from 'react'

interface Props {
  label: string
  url: string
  icon?: ReactNode
}

export default function AppLink({label, url, icon}: Props) {
  return (
    <Button
      component={Link}
      href={url}
      variant="contained"
      startIcon={icon}
    >
      {label}
    </Button>
  )
}
