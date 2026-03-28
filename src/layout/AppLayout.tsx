import {Fragment, ReactNode} from 'react'
import ResponsiveAppBar from '@/components/ResponsiveAppBar'
import Box from '@mui/material/Box'

interface Props {
  children: ReactNode
}

export default function AppLayout({children}: Props) {
  return (
    <Fragment>
      <ResponsiveAppBar />
      <Box sx={{p: 2}}>{children}</Box>
    </Fragment>
  )
}
