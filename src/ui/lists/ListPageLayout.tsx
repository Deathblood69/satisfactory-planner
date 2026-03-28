import {ReactNode} from 'react'
import {Stack} from '@mui/material'

interface Props {
  children: ReactNode
}

export default function ListPageLayout({children}: Props) {
  return <Stack spacing={2}>{children}</Stack>
}
