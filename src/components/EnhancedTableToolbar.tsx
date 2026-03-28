'use client'

import * as React from 'react'
import {ReactNode} from 'react'
import {alpha} from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface Action {
  id: string
  children: ReactNode
  onClick?: (actionId: string, selected: readonly string[]) => void
}

interface EnhancedTableToolbarProps {
  title?: string
  actions: readonly Action[]
  selected: readonly string[]
  numSelected: number
}

export function EnhancedTableToolbar({
  title,
  actions,
  selected,
  numSelected
}: EnhancedTableToolbarProps) {
  return (
    <Toolbar
      sx={[
        {pl: {sm: 2}, pr: {xs: 1, sm: 1}},
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        }
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{flex: '1 1 100%'}}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{flex: '1 1 100%'}}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {actions.map((action) => (
        <Box
          key={action.id}
          onClick={() => action.onClick && action.onClick(action.id, selected)}
        >
          {action.children}
        </Box>
      ))}
    </Toolbar>
  )
}
