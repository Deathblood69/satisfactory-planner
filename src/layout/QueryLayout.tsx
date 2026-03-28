'use client'

import {ReactNode} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

interface Props {
  children: ReactNode
}

export default function QueryLayout({children}: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
