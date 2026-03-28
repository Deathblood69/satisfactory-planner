'use client'

import {Fragment} from 'react'
import {notFound, useParams} from 'next/navigation'
import ListInfo from '@/ui/lists/ListInfo'

export default function Page() {
  const params = useParams()

  const id = params.id

  if (!id || Array.isArray(id)) {
    return notFound()
  }

  return (
    <Fragment>
      <ListInfo id={id} />
    </Fragment>
  )
}
