import {Fragment} from 'react'

interface Props {
  id: string
}

export default function ListInfoPage({id}: Props) {
  return <Fragment>{id}</Fragment>
}
