import {Fragment, ReactNode} from 'react'
import ResponsiveAppBar from '@/components/ResponsiveAppBar'

interface Props {
  children: ReactNode
}

export default function AppLayout({children}: Props) {
  return (
    <Fragment>
      <ResponsiveAppBar />
      {children}
    </Fragment>
  )
}
