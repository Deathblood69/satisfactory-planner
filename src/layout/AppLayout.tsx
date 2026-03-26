'use client'

import {Fragment, ReactNode} from 'react'
import {Stack} from '@mui/material'
import {AppBarMenu} from '@/components/AppBarMenu'
import ThemeSwitch from '@/components/ThemeSwitch'
import AppButtonList from '@/components/AppButtonList'

interface Props {
  children: ReactNode
}

const menu = [
  {label: 'Home', path: '/'},
  {label: 'Tasks', path: '/tasks'},
  {label: 'Categories', path: '/categories'}
]

export default function AppLayout({children}: Props) {
  return (
    <Fragment>
      <AppBarMenu>
        <Stack
          direction="row"
          spacing={1}
        >
          <AppButtonList items={menu} />
          <ThemeSwitch />
        </Stack>
      </AppBarMenu>
      <main>{children}</main>
    </Fragment>
  )
}
