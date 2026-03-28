import {Fragment, ReactNode} from 'react'
import ResponsiveAppBar from '@/components/ResponsiveAppBar'
import Box from '@mui/material/Box'
import {redirect} from 'next/navigation'
import {Assignment} from '@mui/icons-material'

interface Props {
  children: ReactNode
}

const settings = [
  {label: 'Profile', url: '/profile'},
  {label: 'Account', url: '/account'},
  {label: 'Dashboard', url: '/dashboard'},
  {label: 'Logout', url: '/logout'}
]

export default function AppLayout({children}: Props) {
  function handleClick(value: string): void {
    redirect(value)
  }

  return (
    <Fragment>
      <ResponsiveAppBar
        title={'Tasks Lists'}
        icon={<Assignment />}
        settings={settings}
        onClick={handleClick}
      />
      <Box sx={{p: 2}}>{children}</Box>
    </Fragment>
  )
}
