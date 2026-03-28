import {ReactNode} from 'react'
import RootLayout from '@/layout/RootLayout'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter'
import ThemeLayout from '@/layout/ThemeLayout'
import QueryLayout from '@/layout/QueryLayout'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <QueryLayout>
      <ThemeLayout>
        <RootLayout>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </RootLayout>
      </ThemeLayout>
    </QueryLayout>
  )
}
