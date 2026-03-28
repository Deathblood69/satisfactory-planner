'use client'

import ListFields from '@/ui/lists/ListFields'
import {Fragment} from 'react'
import {Stack} from '@mui/material'
import SaveButton from '@/components/SaveButton'
import Button from '@mui/material/Button'

interface Props {
  id: string
}

export default function ListForm({id}: Props) {
  return (
    <Fragment>
      <ListFields />
      <Stack
        direction="row"
        spacing={2}
        justifyContent={'center'}
      >
        <SaveButton edited={Boolean(id)} />
        <Button variant={'outlined'}>Cancel</Button>
      </Stack>
    </Fragment>
  )
}
