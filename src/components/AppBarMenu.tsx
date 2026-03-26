import React from 'react'
import {AppBar, Toolbar, Typography} from '@mui/material'

interface AppBarMenuProps {
  children?: React.ReactNode
}

export function AppBarMenu({children}: AppBarMenuProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{flexGrow: 1}}
        >
          My Next App
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}
