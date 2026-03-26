'use client'

import {createContext, ReactNode, useContext, useMemo, useState} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'

type ThemeContextType = {
  toggleTheme: () => void
  mode: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useThemeMode = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('ThemeContext missing')
  return ctx
}

const queryClient = new QueryClient()

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return 'light' // fallback for SSR
}

export default function Providers({children}: {children: ReactNode}) {
  const [mode, setMode] = useState<'light' | 'dark'>(getInitialTheme)

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newMode)
      return newMode
    })
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {mode}
      }),
    [mode]
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{toggleTheme, mode}}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  )
}
