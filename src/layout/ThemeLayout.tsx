'use client'

import {Fragment, ReactNode} from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  colorSchemes: {
    dark: true
  }
})

interface Props {
  children: ReactNode
}

export default function ThemeLayout({children}: Props) {
  return (
    <Fragment>
      <ThemeProvider
        theme={theme}
        defaultMode="system"
      >
        <CssBaseline enableColorScheme={true} />
        {children}
      </ThemeProvider>
    </Fragment>
  )
}
