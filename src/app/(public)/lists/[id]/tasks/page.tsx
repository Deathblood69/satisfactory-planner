'use client'

import ListDetail from '@/ui/lists/ListDetail'
import {notFound, useParams} from 'next/navigation'

export default function Page() {
  const params = useParams()

  const id = params.id

  if (!id || Array.isArray(id)) {
    return notFound()
  }

  return <ListDetail id={id} />
}
