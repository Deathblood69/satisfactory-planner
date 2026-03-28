'use client'

import ListFields from '@/ui/lists/ListFields'
import {Fragment} from 'react'
import {Stack} from '@mui/material'
import SaveButton from '@/components/SaveButton'
import Button from '@mui/material/Button'
import {useRouter} from 'next/navigation'
import {ROUTES_CONFIG} from '@/config/routes.config'

interface Props {
  id: string
}

export default function ListForm({id}: Props) {
  const router = useRouter()

  return (
    <Fragment>
      <ListFields />
      <Stack
        direction="row"
        spacing={2}
        justifyContent={'center'}
      >
        <SaveButton edited={Boolean(id)} />
        <Button
          variant={'outlined'}
          onClick={() => router.push(`${ROUTES_CONFIG.lists}`)}
        >
          Cancel
        </Button>
      </Stack>
    </Fragment>
  )
}
