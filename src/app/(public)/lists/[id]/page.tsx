'use client'

import {Fragment} from 'react'
import {notFound, useParams} from 'next/navigation'
import ListInfoPage from '@/ui/lists/ListInfoPage'

export default function Page() {
  const params = useParams()

  const id = params.id

  if (!id || Array.isArray(id)) {
    return notFound()
  }

  return (
    <Fragment>
      <ListInfoPage id={id} />
    </Fragment>
  )
}
