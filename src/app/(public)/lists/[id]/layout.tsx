'use client'

import ListFormLayout from '@/ui/lists/ListFormLayout'
import {ReactNode} from 'react'
import {notFound, useParams} from 'next/navigation'

interface Props {
  children: ReactNode
}

export default function Layout({children}: Props): ReactNode {
  const params = useParams()

  const id = params.id

  if (!id || Array.isArray(id)) {
    return notFound()
  }

  return <ListFormLayout id={id}>{children}</ListFormLayout>
}
