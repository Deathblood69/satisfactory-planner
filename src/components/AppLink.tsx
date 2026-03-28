import {Button} from '@mui/material'
import Link from 'next/link'

interface Props {
  label: string
  url: string
}

export default function AppLink({label, url}: Props) {
  return (
    <Button
      component={Link}
      href={url}
      variant="contained"
    >
      {label}
    </Button>
  )
}
