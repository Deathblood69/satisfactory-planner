import {ReactNode} from 'react'
import './globals.css'
import RootLayout from '@/layout/RootLayout'
import AppLayout from '@/layout/AppLayout'
import Providers from '@/providers'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <RootLayout>
      <Providers>
        <AppLayout>{children}</AppLayout>
      </Providers>
    </RootLayout>
  )
}
