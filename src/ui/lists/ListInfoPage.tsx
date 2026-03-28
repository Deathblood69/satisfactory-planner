import {Card} from '@mui/material'

interface Props {
  id: string
}

export default function ListInfoPage({id}: Props) {
  return <Card elevation={2}>{id}</Card>
}
