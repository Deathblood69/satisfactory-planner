import {Button} from '@mui/material'
import Link from 'next/link'

export default function AppLink() {
  return (
    <Button
      component={Link}
      href="/about"
      variant="contained"
    >
      Go to About Page
    </Button>
  )
}
