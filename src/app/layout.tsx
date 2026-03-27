import {ReactNode} from 'react'
import RootLayout from '@/layout/RootLayout'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter'
import {ThemeProvider} from '@mui/material/styles'
import theme from '@/theme'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <RootLayout>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </RootLayout>
  )
}
