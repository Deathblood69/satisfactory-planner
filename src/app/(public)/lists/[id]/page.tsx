'use client'

import {notFound, useParams} from 'next/navigation'
import ListPage from '@/ui/lists/ListPage'

export default function Page() {
  const params = useParams()

  const id = params.id

  if (!id || Array.isArray(id)) {
    return notFound()
  }

  return <ListPage id={id} />
}
