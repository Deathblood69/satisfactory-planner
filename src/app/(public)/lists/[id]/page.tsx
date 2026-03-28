'use client'

import {notFound, useParams} from 'next/navigation'
import ListForm from '@/ui/lists/ListForm'

export default function Page() {
  const params = useParams()

  const id = params.id

  if (!id || Array.isArray(id)) {
    return notFound()
  }

  return <ListForm id={id} />
}
