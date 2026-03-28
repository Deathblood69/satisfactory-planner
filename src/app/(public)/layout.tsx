'use client'

import {Fragment, ReactNode} from 'react'
import AppLayout from '@/layout/AppLayout'

interface Props {
  children: ReactNode
}

export default function Layout({children}: Props) {
  return (
    <Fragment>
      <AppLayout>{children}</AppLayout>
    </Fragment>
  )
}
